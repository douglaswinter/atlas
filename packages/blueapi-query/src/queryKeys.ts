export const planKeys = {
  all: ["plans"] as const,
  detail: (name: string) => ["plans", name] as const,
};

export const taskKeys = {
  all: ["tasks"] as const,
  detail: (id: string) => ["tasks", id] as const,
};

export const workerKeys = {
  task: ["worker", "task"] as const,
  state: ["worker", "state"] as const,
};

export const deviceKeys = {
  all: ["devices"] as const,
  detail: (name: string) => ["devices", name] as const,
};
