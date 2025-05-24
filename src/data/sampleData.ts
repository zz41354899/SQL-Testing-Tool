// Sample process events data
export const sampleProcessData = `[
  {
    "@timestamp": "2023-10-15T14:23:45.678Z",
    "process": {
      "name": "cmd.exe",
      "pid": 1234,
      "command_line": "cmd.exe /c whoami",
      "executable": "C:\\\\Windows\\\\System32\\\\cmd.exe",
      "working_directory": "C:\\\\Users\\\\Admin"
    },
    "host": {
      "name": "win-host-01",
      "ip": ["192.168.1.100", "fe80::1234:5678:abcd:ef12"]
    },
    "user": {
      "name": "admin",
      "id": "S-1-5-21-1234567890-1234567890-1234567890-500"
    },
    "event": {
      "type": "process_start",
      "category": ["process"]
    }
  },
  {
    "@timestamp": "2023-10-15T14:24:12.345Z",
    "process": {
      "name": "powershell.exe",
      "pid": 2345,
      "command_line": "powershell.exe -ExecutionPolicy Bypass -File script.ps1",
      "executable": "C:\\\\Windows\\\\System32\\\\WindowsPowerShell\\\\v1.0\\\\powershell.exe",
      "working_directory": "C:\\\\Users\\\\Admin\\\\Scripts"
    },
    "host": {
      "name": "win-host-01",
      "ip": ["192.168.1.100", "fe80::1234:5678:abcd:ef12"]
    },
    "user": {
      "name": "admin",
      "id": "S-1-5-21-1234567890-1234567890-1234567890-500"
    },
    "event": {
      "type": "process_start",
      "category": ["process"]
    }
  },
  {
    "@timestamp": "2023-10-15T14:25:30.012Z",
    "process": {
      "name": "notepad.exe",
      "pid": 3456,
      "command_line": "notepad.exe C:\\\\temp\\\\notes.txt",
      "executable": "C:\\\\Windows\\\\System32\\\\notepad.exe",
      "working_directory": "C:\\\\temp"
    },
    "host": {
      "name": "win-host-01",
      "ip": ["192.168.1.100", "fe80::1234:5678:abcd:ef12"]
    },
    "user": {
      "name": "user1",
      "id": "S-1-5-21-1234567890-1234567890-1234567890-1001"
    },
    "event": {
      "type": "process_start",
      "category": ["process"]
    }
  }
]`;

// Sample file events data
export const sampleFileData = `[
  {
    "@timestamp": "2023-10-15T15:01:23.456Z",
    "file": {
      "path": "/tmp/suspicious.sh",
      "name": "suspicious.sh",
      "size": 1024,
      "extension": "sh",
      "type": "file",
      "mtime": "2023-10-15T15:00:23.456Z",
      "owner": "root"
    },
    "host": {
      "name": "linux-host-01"
    },
    "user": {
      "name": "root"
    },
    "event": {
      "type": "file_creation",
      "category": ["file"]
    }
  },
  {
    "@timestamp": "2023-10-15T15:05:34.567Z",
    "file": {
      "path": "/home/user/Documents/report.pdf",
      "name": "report.pdf",
      "size": 5242880,
      "extension": "pdf",
      "type": "file",
      "mtime": "2023-10-15T15:05:30.123Z",
      "owner": "user"
    },
    "host": {
      "name": "linux-host-02"
    },
    "user": {
      "name": "user"
    },
    "event": {
      "type": "file_modification",
      "category": ["file"]
    }
  },
  {
    "@timestamp": "2023-10-15T15:10:45.678Z",
    "file": {
      "path": "/var/log/auth.log",
      "name": "auth.log",
      "size": 10485760,
      "extension": "log",
      "type": "file",
      "mtime": "2023-10-15T15:10:40.987Z",
      "owner": "syslog"
    },
    "host": {
      "name": "linux-host-01"
    },
    "user": {
      "name": "syslog"
    },
    "event": {
      "type": "file_modification",
      "category": ["file"]
    }
  }
]`;

// Sample network events data
export const sampleNetworkData = `[
  {
    "@timestamp": "2023-10-15T16:12:34.567Z",
    "network": {
      "protocol": "http",
      "transport": "tcp",
      "direction": "outbound",
      "bytes": 1024,
      "packets": 12,
      "community_id": "1:hGWQZQHGvLSqaQkbPWWbdM9CeTI="
    },
    "source": {
      "ip": "192.168.1.100",
      "port": 54321
    },
    "destination": {
      "ip": "93.184.216.34",
      "port": 80
    },
    "host": {
      "name": "workstation-01"
    },
    "event": {
      "type": "connection",
      "category": ["network"]
    }
  },
  {
    "@timestamp": "2023-10-15T16:15:45.678Z",
    "network": {
      "protocol": "dns",
      "transport": "udp",
      "direction": "outbound",
      "bytes": 120,
      "packets": 2,
      "community_id": "1:qW9IGAjhWQ2urKTK8PaLZ+nvPzI="
    },
    "source": {
      "ip": "192.168.1.100",
      "port": 35642
    },
    "destination": {
      "ip": "8.8.8.8",
      "port": 53
    },
    "host": {
      "name": "workstation-01"
    },
    "event": {
      "type": "lookup",
      "category": ["network"]
    }
  },
  {
    "@timestamp": "2023-10-15T16:20:12.345Z",
    "network": {
      "protocol": "https",
      "transport": "tcp",
      "direction": "outbound",
      "bytes": 8192,
      "packets": 24,
      "community_id": "1:V95tIi+AT3xhmsSyT3+VweKnfcA="
    },
    "source": {
      "ip": "192.168.1.100",
      "port": 49876
    },
    "destination": {
      "ip": "104.18.23.164",
      "port": 443
    },
    "host": {
      "name": "workstation-01"
    },
    "event": {
      "type": "connection",
      "category": ["network"]
    }
  }
]`;

// Sample EQL queries
export const sampleQueries = {
  process: 'process where process.name == "cmd.exe"',
  processWithPid: 'process where process.name == "powershell.exe" and process.pid > 2000',
  file: 'file where file.path contains "/tmp/"',
  network: 'network where network.protocol == "https"'
};