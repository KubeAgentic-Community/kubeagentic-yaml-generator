export interface ApiSecretRef {
  name: string;
  key: string;
}

export interface ResourceSpec {
  requests?: {
    memory?: string;
    cpu?: string;
  };
  limits?: {
    memory?: string;
    cpu?: string;
  };
}

export interface Tool {
  name: string;
  description: string;
  inputSchema: any;
}

export interface LangGraphNode {
  name: string;
  type: 'llm' | 'tool' | 'action';
  prompt?: string;
  tool?: string;
  action?: string;
  condition?: string;
  inputs?: string[];
  outputs?: string[];
}

export interface LangGraphEdge {
  from: string;
  to: string;
  condition?: string;
}

export interface LangGraphConfig {
  graphType: 'sequential' | 'parallel' | 'conditional' | 'hierarchical';
  nodes: LangGraphNode[];
  edges: LangGraphEdge[];
  state?: any;
  entrypoint?: string;
  endpoints?: string[];
}

export interface AgentSpec {
  provider: 'openai' | 'gemini' | 'claude' | 'vllm';
  model: string;
  systemPrompt: string;
  apiSecretRef: ApiSecretRef;
  endpoint?: string;
  framework?: 'direct' | 'langgraph';
  langgraphConfig?: LangGraphConfig;
  tools?: Tool[];
  replicas?: number;
  resources?: ResourceSpec;
  serviceType?: 'ClusterIP' | 'NodePort' | 'LoadBalancer';
}

export interface AgentMetadata {
  name: string;
  namespace?: string;
  labels?: Record<string, string>;
  annotations?: Record<string, string>;
}

export interface KubeAgenticAgent {
  apiVersion: string;
  kind: string;
  metadata: AgentMetadata;
  spec: AgentSpec;
}

export interface FormData {
  metadata: AgentMetadata;
  spec: AgentSpec;
}
