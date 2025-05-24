export interface QueryResult {
  data: any[];
  error?: string;
  queryTime?: number;
}

export type ViewMode = 'json' | 'table';

export interface EqlQueryOptions {
  query: string;
  data: string;
}

export interface StoredQueryData {
  query: string;
  data: string;
  name?: string;
  timestamp: number;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Sample event types that could be in the JSON data
export interface ProcessEvent {
  '@timestamp': string;
  process: {
    name: string;
    pid: number;
    command_line?: string;
    executable?: string;
    working_directory?: string;
  };
  host?: {
    name: string;
    ip?: string[];
  };
  user?: {
    name: string;
    id?: string;
  };
  event?: {
    type: string;
    category?: string[];
  };
}

export interface FileEvent {
  '@timestamp': string;
  file: {
    path: string;
    name: string;
    size?: number;
    extension?: string;
    type?: string;
    mtime?: string;
    owner?: string;
  };
  host?: {
    name: string;
  };
  user?: {
    name: string;
  };
  event?: {
    type: string;
    category?: string[];
  };
}

export interface NetworkEvent {
  '@timestamp': string;
  network: {
    protocol: string;
    transport?: string;
    direction?: string;
    bytes?: number;
    packets?: number;
    community_id?: string;
  };
  source?: {
    ip: string;
    port?: number;
  };
  destination?: {
    ip: string;
    port?: number;
  };
  host?: {
    name: string;
  };
  event?: {
    type: string;
    category?: string[];
  };
}