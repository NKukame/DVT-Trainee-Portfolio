// prisma/extract-and-seed.ts
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { 
  UserRole, 
  EmployeeRole, 
  TechCategory, 
  Department, 
  UserTitle 
} from '@prisma/client'

const prisma = new PrismaClient()

class COPYExtractorSeeder {
  sqlContent
  tableData

  constructor(sqlFilePath) {
    // initialize internal state
    this.tableData = {}

    // resolve SQL file path relative to this script when a relative path is provided
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const resolvedPath = path.isAbsolute(sqlFilePath) ? sqlFilePath : path.join(__dirname, sqlFilePath)

    this.sqlContent = fs.readFileSync(resolvedPath, 'utf8')
  }

  // Extract all COPY statements from SQL
  extractData() {
    console.log('📝 Extracting COPY data from SQL dump...')
    
    // Regex to match COPY statements: COPY table_name (columns) FROM stdin;
    const copyRegex = /COPY (?:public\.)?(?:"?(\w+)"?)\s*\(([^)]+)\)\s*FROM stdin;([\s\S]*?)(?=^\\.$)/gm
    let match

    while ((match = copyRegex.exec(this.sqlContent)) !== null) {
      const tableName = match[1].toLowerCase()
      const columnsString = match[2]
      const dataBlock = match[3].trim()
      
      // Parse column names
      const columns = columnsString
        .split(',')
        .map(col => col.trim().replace(/"/g, ''))

      // Parse data rows (tab-separated)
      const rows = dataBlock
        .split('\n')
        .filter(line => line.trim() && line.trim() !== '\\.')
        .map(line => this.parseTabSeparatedRow(line))

      this.tableData[tableName] = {
        columns,
        rows
      }

      console.log(`📊 Extracted ${rows.length} rows from ${tableName} with columns: ${columns.join(', ')}`)
    }

    console.log(`📦 Extracted data from ${Object.keys(this.tableData).length} tables`)
    return this.tableData
  }

  // Parse tab-separated row
  parseTabSeparatedRow(line) {
    return line.split('\t').map(value => this.convertValue(value))
  }

  // Convert string values to appropriate types
  convertValue(value) {
    if (value === '\\N') return null // PostgreSQL NULL representation
    // Preserve empty strings from COPY as empty strings, not null
    if (value === '') return ''
    const lower = String(value).toLowerCase()
    // Handle PostgreSQL boolean short forms from COPY: 't'/'f'
    if (lower === 'true' || lower === 't' || lower === '1') return true
    if (lower === 'false' || lower === 'f' || lower === '0') return false
    // Do NOT coerce numeric-looking strings; Prisma schema mostly uses strings/uuids
    if (/^\d{4}-\d{2}-\d{2}/.test(value)) return new Date(value)
    return value // Keep as string by default
  }

  // Map SQL table names to Prisma model methods
  getTableMapping() {
    return {
      'user': 'user',
      'employee': 'employee',
      'project': 'project',
      'projectmember': 'projectMember',
      'testimonial': 'testimonial',
      'availability': 'availability',
      'techstack': 'techStack',
      'softskill': 'softSkill',
      'employeetechstack': 'employeeTechStack',
      'employeesoftskill': 'employeeSoftSkill',
      'industry': 'industry',
      'projectindustry': 'projectIndustry',
      'projecttechstack': 'projectTechStack',
      'education': 'education',
      'certificate': 'certificate',
      'career': 'career'
    }
  }

  // Clear existing data in dependency order
  async clearDatabase() {
    console.log('🧹 Clearing existing data...')
    
    const clearOrder = [
      'career', 'certificate', 'education', 'projectTechStack', 
      'projectIndustry', 'employeeSoftSkill', 'employeeTechStack',
      'projectMember', 'availability', 'testimonial', 'user',
      'project', 'employee', 'industry', 'softSkill', 'techStack'
    ]

    for (const table of clearOrder) {
      try {
        await prisma[table].deleteMany()
        console.log(`✅ Cleared ${table}`)
      } catch (error) {
        console.warn(`⚠️ Could not clear ${table}:`, error)
      }
    }
  }

  // Seed data in correct dependency order
  async seedData() {
    console.log('🌱 Starting data seeding...')

    const seedOrder = [
      'techStack', 'softSkill', 'industry', 'employee', 'user',
      'project', 'testimonial', 'availability', 'employeeTechStack',
      'employeeSoftSkill', 'projectMember', 'projectIndustry',
      'projectTechStack', 'education', 'certificate', 'career'
    ]

    const tableMapping = this.getTableMapping()

    for (const prismaModel of seedOrder) {
      const sqlTableName = Object.keys(tableMapping).find(
        key => tableMapping[key] === prismaModel
      )

      if (!sqlTableName || !this.tableData[sqlTableName]) {
        console.log(`⏭️ No data found for ${prismaModel}, skipping...`)
        continue
      }

      const { columns, rows } = this.tableData[sqlTableName]
      console.log(`📦 Seeding ${rows.length} records into ${prismaModel}...`)

      try {
        // Transform raw data with column mapping
        const transformedData = this.transformDataWithColumns(prismaModel, rows, columns)
        
        if (transformedData.length > 0) {
          await prisma[prismaModel].createMany({
            data: transformedData,
            skipDuplicates: true
          })
          console.log(`✅ Successfully seeded ${transformedData.length} ${prismaModel} records`)
        }
      } catch (error) {
        console.error(`❌ Error seeding ${prismaModel}:`, error)
        // Log first few records for debugging
        console.log('Sample data:', rows.slice(0, 2))
        console.log('Columns:', columns)
      }
    }
  }

  // Transform data using actual column names from COPY statement
  transformDataWithColumns(modelName, rows, columns) {
    return rows.map(row => {
      const obj = {}
      
      columns.forEach((column, index) => {
        const prismaField = this.mapColumnToPrismaField(modelName, column)
        const value = row[index]
        
        // Apply model-specific transformations
        obj[prismaField] = this.transformFieldValue(modelName, prismaField, value)
      })
      
      return obj
    })
  }

  // Map SQL column names to Prisma field names
  mapColumnToPrismaField(modelName, sqlColumn) {
    // Handle common naming differences
    const columnMappings = {
      'employeetechstack': {
        'techrating': 'Techrating' // Capital T in your schema
      },
      'employeesoftskill': {
        'skillsrating': 'skillsRating'
      }
      // Add more mappings as needed
    }

    const key = (modelName || '').toLowerCase()
    return columnMappings[key]?.[sqlColumn.toLowerCase()] || sqlColumn
  }

  // Transform field values based on model and field type
  transformFieldValue(modelName, fieldName, value) {
    if (value === null) return null

    // Normalize rating-like fields that should be strings in Prisma
    if (modelName === 'employeeTechStack' && fieldName === 'Techrating') {
      // Treat empty string as null; if boolean from COPY, drop to null; else cast to string
      if (value === '' || typeof value === 'boolean') return null
      return String(value)
    }
    if (modelName === 'employeeSoftSkill' && fieldName === 'skillsRating') {
      if (value === '' || typeof value === 'boolean') return null
      return String(value)
    }

    // Handle enum fields
    if (fieldName === 'role') {
      if (modelName === 'user') return this.mapToEnum(value, UserRole)
      if (modelName === 'employee' || modelName === 'projectMember') return this.mapToEnum(value, EmployeeRole)
    }
    if (fieldName === 'title') return this.mapToEnum(value, UserTitle)
    if (fieldName === 'department') return this.mapToEnum(value, Department)
    if (fieldName === 'category') return this.mapToEnum(value, TechCategory)

    // Handle date fields
    if (fieldName.includes('At') || fieldName === 'birthday' || fieldName === 'joinedAt') {
      return value ? new Date(value) : null
    }

    return value
  }

  // Helper to map strings to enums
  mapToEnum(value, enumObj) {
    if (!value) return null
    const normalized = String(value)
      .replace(/[ .-]+/g, '_')
      .replace(/__+/g, '_')
      .toUpperCase()
    // Quick synonyms
    const synonyms = {
      PM: 'PROJECT_MANAGER',
      TL: 'TEAM_LEAD',
      DEV: 'DEVELOPER',
      MR: 'MR',
      MRS: 'MRS',
      MS: 'MS',
      DR: 'DR'
    }
    const candidate = synonyms[normalized] || normalized
    return Object.values(enumObj).find(v => v === candidate) || null
  }

  // Main execution method
  async run(sqlFilePath) {
    try {
      console.log('🚀 Starting COPY Extract & Seed Process...')
      
      // Extract data from SQL
      this.extractData()
      
      // Show what we found
      Object.entries(this.tableData).forEach(([table, data]) => {
        console.log(`📋 ${table}: ${data.rows.length} rows, columns: ${data.columns.join(', ')}`)
      })
      
      // Clear existing data
      await this.clearDatabase()
      
      // Seed new data
      await this.seedData()
      
      console.log('🎉 Extract & Seed completed successfully!')
      
    } catch (error) {
      console.error('💥 Extract & Seed failed:', error)
      throw error
    }
  }
}

// Usage
async function main() {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const sqlPath = path.join(__dirname, 'dump.sql')
  const extractor = new COPYExtractorSeeder(sqlPath)
  await extractor.run(sqlPath)
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('✅ Database connection closed')
  })
  .catch(async (e) => {
    console.error('❌ Process failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })