# KubeAgentic YAML Generator

A modern web interface for generating KubeAgentic YAML configurations for Kubernetes AI agent deployments.

## 🚀 Features

- **Interactive UI**: Step-by-step wizard for configuring AI agents
- **Multi-Provider Support**: OpenAI, Claude, Gemini, and vLLM support
- **Framework Selection**: Choose between Direct and LangGraph frameworks
- **Tool Integration**: Define custom tools for your agents
- **Resource Management**: Configure scaling and resource allocation
- **Real-time Preview**: See generated YAML as you configure
- **Export Options**: Copy to clipboard or download YAML files

## 🌐 Live Demo

Visit the live application at: [https://kubeagentic-community.github.io/kubeagentic-yaml-generator](https://kubeagentic-community.github.io/kubeagentic-yaml-generator)

## 🛠️ Local Development

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
git clone https://github.com/KubeAgentic-Community/kubeagentic-yaml-generator.git
cd kubeagentic-yaml-generator
npm install
```

### Running the Application

```bash
npm start
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

### Deploying to GitHub Pages

```bash
npm run deploy
```

## 📖 Usage

1. **Basic Information**: Enter agent name, namespace, system prompt, and API secret reference
2. **Provider & Model**: Select your AI provider (OpenAI, Claude, Gemini, vLLM) and model
3. **Framework**: Choose between Direct (simple) or LangGraph (complex workflows)
4. **Tools**: Define custom tools your agent can use (optional)
5. **Resources**: Configure scaling, resource limits, and service type
6. **Review & Generate**: Review your configuration and generate the final YAML

## 🔧 Configuration Options

### Supported Providers
- **OpenAI**: GPT-3.5, GPT-4, GPT-4 Turbo
- **Claude**: Claude-3 Opus, Sonnet, Haiku
- **Gemini**: Gemini Pro, Gemini Pro Vision
- **vLLM**: Self-hosted models

### Frameworks
- **Direct**: Simple API calls for basic interactions
- **LangGraph**: Complex multi-step workflows with conditional logic

### Resource Options
- Replica scaling (1-10 instances)
- Memory and CPU requests/limits
- Service types (ClusterIP, NodePort, LoadBalancer)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- [KubeAgentic](https://github.com/KubeAgentic-Community/KubeAgentic) - The Kubernetes operator for AI agents
- [KubeAgentic Documentation](https://kubeagentic.com) - Complete documentation and guides

## 📞 Support

- GitHub Issues: [Report bugs or request features](https://github.com/KubeAgentic-Community/kubeagentic-yaml-generator/issues)
- Documentation: [https://kubeagentic.com](https://kubeagentic.com)
- Community: [KubeAgentic Community](https://github.com/KubeAgentic-Community)
