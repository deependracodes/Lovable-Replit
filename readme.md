# Lovable is an AI-powered software engineering and "vibe coding" platform that lets you build full-stack web applications, landing pages, etc through natural language chat without writing code

# LangChain is an open-source framework and agent engineering platform designed to help developers build applications powered by large language models (LLMs).

# E2B is an open-source cloud infrastructure platform that runs AI-generated code and agent sessions inside secure, isolated Linux microVMs built on Firecracker

# Tools
  - NodeJS,Typescript,Express,Primsa + PgSQL,Docker, LLM,LangChainJS,E2B,ready made frontend

[NOTE] In this project we need a chagpt model with a minimum of 10-20$ credits , if you need a free trier feel free to use , but the response would be not great as paid models 

+---------------------------------------------------------------------------------+
|                                USER & CLIENT APP                                |
+---------------------------------------------------------------------------------+
                                         |
                                         v (HTTP / WebSocket)
+---------------------------------------------------------------------------------+
|                        API GATEWAY & EXPRESS ORCHESTRATOR                       |
|  - Zod Request Validation                                                       |
|  - JWT Authorization    
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                            LANGCHAINJS AGENTIC CORE                             |
|  - LLM Integration (OpenAI GPT-4o / Claude 3.5 Sonnet)                          |
|  - Tool Calling & Structured Outputs (Zod Schemas)                              |
|  - Stateful Conversation Memory (PostgreSQL / Temporal Workflows)               |
+---------------------------------------------------------------------------------+
                                         |
             +---------------------------+---------------------------+
             |                                                       |
             v (Host Execution / Local)                              v (Sandboxed Cloud / E2B)
+-----------------------------------+   +-------------------------------------+
|      LOCAL WORKSPACE RUNTIME      |   |        E2B FIRECRACKER MICROVM      |
|  - File System Interceptor        |   |  - Isolated Linux Container         |
|  - AST Code Transformers          |   |  - Zero-Trust Egress/Ingress Proxy  |
|  - Prisma Migrations              |   |  - Dynamic Vite/Node.js Dev Server  |
+-----------------------------------+   +-------------------------------------+

# Basic AI Engineering Concepts
  
- LLMS - Large language model
       - its a neural network based on transformer architecture
       - neural ntwork is a mathematical model using which we can do some predictions algorithm
         * it has neutron and weights associated to it  often called as parameters
       - takes and splits input as token and convert to vector embeddings and tries to find the next tokens using some mathemical function
       - But it cannot do tasks for us , its just a brain
       - Ex : Chatgpt , Claude , Gemini ,Deepseek ,Grok etc
              and theirs sub models with thier own capabilties (Context window[max tokens it can process], reasoning ,coding,tool calling[web search,file search,computer access],image processing, fast resposne , research/thinking etc)

- Harness - is a wrapper around LLM's such adding tooling and execution evnvironment , to make it operational , controable and testable in software eng workflows

# Tools are 3 types
  * tools provided by you [Ex : custom file search in local machine]
  * tools provided by provider itself [Defualt tools provided by the provider (openai/anthropic) like web search etc]
  * third party tools - using MCP Model context processing protocol [connectin to gmail,github,linkedIN, slack etc]


# Ai Agent = LLM + Capability to execute tasks

# egress - trafic going out
# ingres - trafic coming in

# Agentic loop

Agent ---prompt + tools----LLM---also has tools like(server tool,third party tool(mcp),functions,websearch) --- it will use it and gives us a answer back to agent--- according to answer agent do the excecution -- response back to LLM -- continue loop till app is ready

As llm do not have the capability to access our system , we provided some tools like read,write files etc as tools thorugh Agents

# langchain helps us in making agents and making convo with llm and tooling calling (agentic loop) easier

# Why LLM does not allow us to hit thrid party api req , becuase of netowrk trafice , we can hit some malicious or random website , so on there end there servers take care of them
   


