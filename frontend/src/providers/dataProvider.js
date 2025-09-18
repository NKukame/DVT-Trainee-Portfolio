

const API_URL = 'http://localhost:3000/api/v2';

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const dataProvider = {
    getList: async function (params) {
        const queryArgs = {};
        console.log(params);
        // filtering
        if (params.filters && params.filters.length > 0) {
            const filters = params.filters.map((filter) =>
                transformFilter(filter)
            );
            if (filters.length > 1) {
                queryArgs.where = { AND: filters };
            } else {
                queryArgs.where = filters[0];
            }
        }

        // sorting
        if (params.sorters && params.sorters.length > 0) {
            queryArgs.orderBy = params.sorters.map((sorter) => ({
                [sorter.field]: sorter.order,
            }));
        }

        // pagination
        if (
            params.pagination?.mode === 'server' &&
            params.pagination.current !== undefined &&
            params.pagination.pageSize !== undefined
        ) {
            queryArgs.take = params.pagination.pageSize;
            queryArgs.skip =
                (params.pagination.current - 1) * params.pagination.pageSize;
        }

        // Add includes for related data if specified in meta
        if (params.meta?.include) {
            queryArgs.include = params.meta.include;
        }

        const [data, count] = await Promise.all([
            fetchData(params.resource, '/findMany', queryArgs),
            fetchData(params.resource, '/count'),
        ]);

        return { data, total: count };
    },

    getOne: async function (params) {
        const queryArgs = {};
        
        // Add includes for related data if specified in meta
        if (params.meta?.include) {
            queryArgs.include = params.meta.include;
        }

        const data = await fetchData(params.resource, '/findUnique', {
            where: { id: params.id },
            ...queryArgs
        });
        return { data };
    },

    create: async function (params) {
        return mutateData(params.resource, 'create', 'POST', {
            data: params.variables,
        });
    },

    update: async function (params) {
        const data = await mutateData(params.resource, 'update', 'PATCH', {
            where: { id: params.id },
            data: params.variables,
        });
        return { data };
    },

    deleteOne: async function (params) {
        const data = await deleteData(params.resource, 'delete', {
            where: { id: params.id },
        });
        return { data };
    },

    getApiUrl: function () {
        return '/api/model';
    },
};

function makeQuery(resource, endpoint, args) {
    let url = `${API_URL}/${resource}${
        endpoint.startsWith('/') ? endpoint : '/' + endpoint
    }`;
    if (args) {
        url += `?q=${encodeURIComponent(JSON.stringify(args))}`;
    }
    return url;
}

async function fetchData(resource, endpoint, args) {
    const resp = await fetch(makeQuery(resource, endpoint, args), {
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        }
    });
    if (!resp.ok) {
        throw new Error(`Failed to fetch ${resource}: ${resp.statusText}`);
    }
    return (await resp.json()).data;
}

async function mutateData(resource, endpoint, method, args) {
    try {
        if (resource === 'employee' && endpoint === 'update') {
            console.debug('[dataProvider] employee.update payload =>', JSON.stringify(args, null, 2));
        }
    } catch (_) { /* noop */ }
    const resp = await fetch(makeQuery(resource, endpoint), {
        method,
        headers: { 
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        },
        body: JSON.stringify(args),
    });

    if (!resp.ok) {
        throw new Error(`Failed to post ${resource}: ${resp.statusText}`);
    }
    return (await resp.json()).data;
}

async function deleteData(resource, endpoint, args) {
    const resp = await fetch(makeQuery(resource, endpoint, args), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        }
    });
    if (!resp.ok) {
        throw new Error(`Failed to fetch ${resource}: ${resp.statusText}`);
    }
    return (await resp.json()).data;
}


function transformFilter(filter) {
    const { field, operator, value } = filter;

    switch (operator) {
        case 'eq':
            return { [field]: value };
        case 'ne':
            return { NOT: { [field]: value } };
        case 'in':
            return { [field]: { in: value } };
        case 'nin':
            return { [field]: { notIn: value } };
        case 'gt':
        case 'lt':
        case 'gte':
        case 'lte':
        case 'contains':
            return { [field]: { [operator]: value } };
        case 'between':
            return { [field]: { gte: value[0], lte: value[1] } };
        case 'nbetween':
            return { NOT: transformFilter({ ...filter, operator: 'between' }) };
        case 'startswith':
            return { [field]: { startsWith: value, mode: 'insensitive' } };
        case 'endswith':
            return { [field]: { endsWith: value, mode: 'insensitive' } };
        case 'containss': // Note: this seems like a typo of 'contains', but keeping as is.
            return { [field]: { contains: value, mode: 'insensitive' } };
        case 'startswiths':
            return { [field]: { startsWith: value } };
        case 'endswiths':
            return { [field]: { endsWith: value } };
        case 'ncontains':
            return { NOT: { ...transformFilter({ ...filter, operator: 'contains' }), mode: 'insensitive' } };
        case 'nstartswith':
            return { NOT: { ...transformFilter({ ...filter, operator: 'startswith' }), mode: 'insensitive' } };
        case 'nendswith':
            return { NOT: { ...transformFilter({ ...filter, operator: 'endswith' }), mode: 'insensitive' } };
        case 'ncontainss':
            return { NOT: transformFilter({ ...filter, operator: 'contains' }) };
        case 'nstartswiths':
            return { NOT: transformFilter({ ...filter, operator: 'startswith' }) };
        case 'nendswiths':
            return { NOT: transformFilter({ ...filter, operator: 'endswith' }) };
        case 'null':
            return { [field]: null };
        case 'nnull':
            return { NOT: { [field]: null } };
        case 'and':
            return { AND: value.map(transformFilter) };
        case 'or':
            return { OR: value.map(transformFilter) };
        default:
            // Or throw an error if unsupported operator should be handled strictly.
            return {};
    }
}