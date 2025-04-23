---
sidebar_position: 18
---

# 🛡️ Deploying Eliza to TEE with Oasis ROFL

![](/img/eliza_in_tee.jpg)

## Overview

Eliza can be deployed to a Trusted Execution Environment (TEE) using the [Oasis SDK](https://github.com/oasisprotocol/oasis-sdk). This guide will walk you through the process of setting up and running Eliza in a TEE environment using the Oasis ROFL tool.

### Background

The Oasis ROFL tool is built on top of the [Oasis SDK](https://github.com/oasisprotocol/oasis-sdk), which is designed to simplify the deployment of applications to TEE environments. The main features include:

- Secure deployment of applications to TEE environments
- Remote attestation and verification
- Support for both development and production environments
- Integration with the Oasis network

---

## Core Components

Eliza's TEE implementation consists of several key components that work together to provide a secure execution environment:

1. ROFL Application Configuration
2. Secret Management
3. Build and Deployment System

These components ensure:
- Secure execution of the Eliza agent
- Protected handling of sensitive data
- Verifiable proof of TEE execution
- Support for both development and production environments

---

### ROFL Application Configuration

The ROFL application configuration handles the setup and management of the TEE environment. It supports:

- Multiple deployment modes:
    - `testnet`: For development and testing
    - `mainnet`: For production deployment

Key features:
- Secure application deployment
- Configuration management
- Policy enforcement
- Resource allocation

Example configuration:

```yaml
services:
  eliza:
    restart: always
    image: ghcr.io/elizaos/eliza:latest
    build:
      context: .
      dockerfile: Dockerfile
    platform: linux/amd64
    environment:
      - CHARACTERS=${CHARACTERS}
      - SERVER_PORT=${SERVER_PORT}
```

---

### Secret Management

The secret management system handles secure storage and access to sensitive data. It:

- Encrypts environment variables and secrets
- Provides secure access to sensitive data
- Supports both development and production environments

Key features:
- Secure secret storage
- Environment variable encryption
- Access control
- Audit logging

Here's a comprehensive list of secrets you might want to set for your Eliza agent:

```bash
# Basic Configuration
# Set the character file path (you can use any character file of your choice)
echo -n "characters/staff-engineer.character.json" | oasis rofl secret set CHARACTERS -
echo -n "3000" | oasis rofl secret set SERVER_PORT -
echo -n "5173" | oasis rofl secret set UI_PORT -
echo -n "" | oasis rofl secret set UI_ALLOWED_HOSTS -
echo -n "" | oasis rofl secret set UI_SERVER_URL -
echo -n "" | oasis rofl secret set REMOTE_CHARACTER_URLS -
echo -n "false" | oasis rofl secret set USE_CHARACTER_STORAGE -

# Logging Configuration
echo -n "log" | oasis rofl secret set DEFAULT_LOG_LEVEL -
echo -n "false" | oasis rofl secret set LOG_JSON_FORMAT -
echo -n "false" | oasis rofl secret set INSTRUMENTATION_ENABLED -
echo -n "" | oasis rofl secret set EXPRESS_MAX_PAYLOAD -

# OpenAI Configuration
echo -n "sk-proj-XXXX" | oasis rofl secret set OPENAI_API_KEY -
echo -n "" | oasis rofl secret set OPENAI_API_URL -
echo -n "" | oasis rofl secret set SMALL_OPENAI_MODEL -
echo -n "" | oasis rofl secret set MEDIUM_OPENAI_MODEL -
echo -n "" | oasis rofl secret set LARGE_OPENAI_MODEL -
echo -n "" | oasis rofl secret set EMBEDDING_OPENAI_MODEL -
echo -n "" | oasis rofl secret set IMAGE_OPENAI_MODEL -
echo -n "false" | oasis rofl secret set USE_OPENAI_EMBEDDING -

# GitHub Integration
echo -n "true" | oasis rofl secret set GITHUB_CLIENT_DISABLED -
echo -n "true" | oasis rofl secret set GITHUB_PLUGIN_ENABLED -
echo -n "ghp_XXXX" | oasis rofl secret set GITHUB_API_TOKEN -
echo -n "5000" | oasis rofl secret set GITHUB_USER_CHECK_INTERVAL_MS -
echo -n "5000" | oasis rofl secret set GITHUB_INFO_DISCOVERY_INTERVAL_MS -
echo -n "20000" | oasis rofl secret set GITHUB_OODA_INTERVAL_MS -
echo -n "10" | oasis rofl secret set GITHUB_ISSUES_LIMIT -
echo -n "10" | oasis rofl secret set GITHUB_PULL_REQUESTS_LIMIT -

# Database Configuration
echo -n "postgresql://user:password@localhost:5432/eliza" | oasis rofl secret set POSTGRES_URL -
```

## Tutorial

---

### Prerequisites

Before getting started with Eliza in TEE, ensure you have:

- [Oasis CLI](https://github.com/oasisprotocol/cli/releases) installed
- Docker Desktop or Orbstack (Orbstack is recommended)
- Testnet tokens from the [Oasis Faucet](https://faucet.testnet.oasis.dev/)
- A character file for your Eliza agent (you can use the example character file or create your own)

---

### Environment Setup

To set up your environment for TEE development:

1. **Create a keypair**

    ```bash
    oasis wallet create <account-name>
    ```

2. **Request Testnet Tokens**

    Visit the [Oasis Faucet](https://faucet.testnet.oasis.dev/) to request TEST tokens.

3. **Create a ROFL Application**

    Create the ROFL application:

    ```bash
    oasis rofl create --network testnet --account <account-name>
    ```

### Build and Deploy the ROFL app

1. **Configure the ROFL app**

    Update the `rofl-compose.yaml` file with your configuration:

    ```yaml
    services:
      eliza:
        restart: always
        image: ghcr.io/elizaos/eliza:latest
        build:
          context: .
          dockerfile: Dockerfile
        platform: linux/amd64
        environment:
          - CHARACTERS=${CHARACTERS}
          - SERVER_PORT=${SERVER_PORT}
          # Add other required environment variables
    ```

2. **Encrypt Secrets**

    Encrypt all required environment variables. You can use any character file of your choice - here we're using the staff engineer character as an example. Refer to the Secret Management section above for a comprehensive list of secrets you might want to set:

    ```bash
    # Set the character file path (you can use any character file of your choice)
    echo -n "characters/staff-engineer.character.json" | oasis rofl secret set CHARACTERS -
    echo -n "3000" | oasis rofl secret set SERVER_PORT -
    # Add other required secrets
    ```

    **WARNING:** Secrets are end-to-end encrypted with your account key and an ephemeral key of the chain where it will be deployed to (Testnet or Mainnet). Migrating encrypted secrets from one deployment to another is not possible.

3. **Configure ROFL Resources**

    Adjust the resource allocation in your `rofl.yaml` file to match your application's requirements. This includes memory, CPU, and storage settings:

    ```yaml
    resources:
      memory: 16384  # Memory in MB (16GB in this example)
      cpus: 1        # Number of CPU cores
      storage:
        kind: disk-persistent
        size: 10240  # Storage size in MB (10GB in this example)
    ```

    Adjust these values based on your specific needs:
    - `memory`: Set the amount of RAM your application needs (in MB)
    - `cpus`: Specify the number of CPU cores to allocate
    - `storage`: Configure persistent storage with the required size

4. **Build the ROFL Application**

    For MacOS users, use the following Docker image:

    ```bash
    docker run --platform linux/amd64 --volume .:/src --rm -it ghcr.io/oasisprotocol/rofl-dev:main oasis rofl build
    ```

5. **Deploy the ROFL Application**

    The recommended way to deploy your ROFL application is using the Oasis CLI:

    ```bash
    oasis rofl deploy
    ```

    This command will:
    1. Check if you have an existing machine available
    2. If no machine exists, it will:
       - Present a list of available providers
       - Allow you to select a provider and plan for a TDX-capable machine
       - Handle the payment process for renting the machine
    3. Deploy your ROFL application to the selected machine

    You can deploy to:
    - Your own nodes (if you're the provider)
    - Oasis-sponsored nodes
    - Third-party nodes

    For more advanced deployment options and configuration, refer to the [Oasis CLI documentation](https://docs.oasis.io/cli/).

### Verify TEE Deployment

Once deployed, you can verify whether your ROFL instance is running, the latest logs and the runtime-attestation key:

    ```bash
    oasis rofl machine show
    ```

Congratulations! You have successfully deployed Eliza to a TEE environment.
