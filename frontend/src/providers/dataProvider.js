

const API_URL = 'http://localhost:3000/api/v2';

export const dataProvider = {
    getList: async function (params) {
        const queryArgs = {};

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
        const data = await mutateData(params.resource, 'update', 'PUT', {
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
    const resp = await fetch(makeQuery(resource, endpoint, args));
    if (!resp.ok) {
        throw new Error(`Failed to fetch ${resource}: ${resp.statusText}`);
    }
    return (await resp.json()).data;
}

async function mutateData(resource, endpoint, method, args) {
    const resp = await fetch(makeQuery(resource, endpoint), {
        method,
        headers: { 'Content-Type': 'application/json' },
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
    });
    if (!resp.ok) {
        throw new Error(`Failed to fetch ${resource}: ${resp.statusText}`);
    }
    return (await resp.json()).data;
}


function transformFilter(filter) {
    return match(filter)
        .with({ operator: 'eq' }, (f) => ({ [f.field]: f.value }))
        .with({ operator: 'ne' }, (f) => ({ NOT: { [f.field]: f.value } }))
        .with({ operator: 'in' }, (f) => ({ [f.field]: { in: f.value } }))
        .with({ operator: 'nin' }, (f) => ({ [f.field]: { notIn: f.value } }))
        .with(
            { operator: P.union('gt', 'lt', 'gte', 'lte', 'contains') },
            (f) => ({ [f.field]: { [f.operator]: f.value } })
        )
        .with({ operator: 'between' }, (f) => ({
            [f.field]: { gte: f.value[0], lte: f.value[1] },
        }))
        .with({ operator: 'nbetween' }, (f) => ({
            NOT: transformFilter({ ...f, operator: 'between' }),
        }))
        .with({ operator: 'startswith' }, (f) => ({
            [f.field]: { startsWith: f.value, mode: 'insensitive' },
        }))
        .with({ operator: 'endswith' }, (f) => ({
            [f.field]: { endsWith: f.value, mode: 'insensitive' },
        }))
        .with({ operator: 'containss' }, (f) => ({
            [f.field]: { contains: f.value, mode: 'insensitive' },
        }))
        .with({ operator: 'startswiths' }, (f) => ({
            [f.field]: { startsWith: f.value },
        }))
        .with({ operator: 'endswiths' }, (f) => ({
            [f.field]: { endsWith: f.value },
        }))
        .with({ operator: 'ncontains' }, (f) => ({
            NOT: {
                ...transformFilter({ ...f, operator: 'contains' }),
                mode: 'insensitive',
            },
        }))
        .with({ operator: 'nstartswith' }, (f) => ({
            NOT: {
                ...transformFilter({ ...f, operator: 'startswith' }),
                mode: 'insensitive',
            },
        }))
        .with({ operator: 'nendswith' }, (f) => ({
            NOT: {
                ...transformFilter({ ...f, operator: 'endswith' }),
                mode: 'insensitive',
            },
        }))
        .with({ operator: 'ncontainss' }, (f) => ({
            NOT: transformFilter({ ...f, operator: 'contains' }),
        }))
        .with({ operator: 'nstartswiths' }, (f) => ({
            NOT: transformFilter({ ...f, operator: 'startswith' }),
        }))
        .with({ operator: 'nendswiths' }, (f) => ({
            NOT: transformFilter({ ...f, operator: 'endswith' }),
        }))
        .with({ operator: 'null' }, (f) => ({ [f.field]: null }))
        .with({ operator: 'nnull' }, (f) => ({ NOT: { [f.field]: null } }))
        .with({ operator: 'and' }, (f) => ({
            AND: f.value.map(transformFilter),
        }))
        .with({ operator: 'or' }, (f) => ({ OR: f.value.map(transformFilter) }))
        .exhaustive();
}