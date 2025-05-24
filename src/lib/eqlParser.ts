import { QueryResult } from '../types';

/**
 * Parse and execute an EQL query against provided JSON data
 */
export function executeEqlQuery(query: string, jsonData: string): QueryResult {
  try {
    // Parse the JSON data
    let parsedData: any[];
    try {
      const data = JSON.parse(jsonData);
      parsedData = Array.isArray(data) ? data : [data];
    } catch (error) {
      return {
        data: [],
        error: `JSON parsing error: ${(error as Error).message}`
      };
    }

    // Start timing the query execution
    const startTime = performance.now();
    
    // Simple EQL parser for basic operations
    // This is a simplified version that handles only basic patterns
    const result = parseAndExecuteQuery(query, parsedData);
    
    // Calculate execution time
    const queryTime = performance.now() - startTime;
    
    return {
      data: result,
      queryTime
    };
  } catch (error) {
    return {
      data: [],
      error: `Query execution error: ${(error as Error).message}`
    };
  }
}

/**
 * Parse and execute the EQL query
 */
function parseAndExecuteQuery(query: string, data: any[]): any[] {
  // Simplify and normalize the query
  query = query.trim();
  
  // Basic pattern matching for simple queries
  const processWherePattern = /^(\w+)\s+where\s+(.+)$/i;
  const match = query.match(processWherePattern);
  
  if (!match) {
    throw new Error('Invalid EQL syntax. Expected format: [event_type] where [conditions]');
  }
  
  const [, eventType, conditionsStr] = match;
  
  // Filter the data based on the event type and conditions
  return data.filter(item => {
    // Check if this is the right event type
    if (!item[eventType] && eventType !== 'event') {
      return false;
    }
    
    // Parse and evaluate the conditions
    return evaluateConditions(conditionsStr, item);
  });
}

/**
 * Evaluate conditions in the EQL query
 */
function evaluateConditions(conditionsStr: string, item: any): boolean {
  // Handle AND conditions
  if (conditionsStr.includes(' and ')) {
    const conditions = conditionsStr.split(' and ');
    return conditions.every(condition => evaluateCondition(condition.trim(), item));
  }
  
  // Handle OR conditions
  if (conditionsStr.includes(' or ')) {
    const conditions = conditionsStr.split(' or ');
    return conditions.some(condition => evaluateCondition(condition.trim(), item));
  }
  
  // Single condition
  return evaluateCondition(conditionsStr, item);
}

/**
 * Evaluate a single condition
 */
function evaluateCondition(condition: string, item: any): boolean {
  // Check for equality condition
  if (condition.includes(' == ')) {
    const [field, value] = condition.split(' == ').map(s => s.trim());
    // Remove quotes from string literals
    const cleanValue = value.startsWith('"') && value.endsWith('"') 
      ? value.substring(1, value.length - 1)
      : value;
    
    return getNestedValue(item, field) === (isNaN(Number(cleanValue)) ? cleanValue : Number(cleanValue));
  }
  
  // Check for greater than condition
  if (condition.includes(' > ')) {
    const [field, value] = condition.split(' > ').map(s => s.trim());
    return getNestedValue(item, field) > Number(value);
  }
  
  // Check for less than condition
  if (condition.includes(' < ')) {
    const [field, value] = condition.split(' < ').map(s => s.trim());
    return getNestedValue(item, field) < Number(value);
  }
  
  // Check for contains condition
  if (condition.includes(' contains ')) {
    const [field, value] = condition.split(' contains ').map(s => s.trim());
    // Remove quotes from string literals
    const cleanValue = value.startsWith('"') && value.endsWith('"') 
      ? value.substring(1, value.length - 1)
      : value;
    
    const fieldValue = getNestedValue(item, field);
    return typeof fieldValue === 'string' && fieldValue.includes(cleanValue);
  }
  
  throw new Error(`Unsupported condition: ${condition}`);
}

/**
 * Get a nested value from an object using dot notation
 */
function getNestedValue(obj: any, path: string): any {
  const keys = path.split('.');
  return keys.reduce((o, key) => (o && o[key] !== undefined ? o[key] : undefined), obj);
}