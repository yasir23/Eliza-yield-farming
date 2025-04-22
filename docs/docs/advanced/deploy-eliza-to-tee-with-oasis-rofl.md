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

1. **Create an Oasis Account**

    ```bash
    oasis-cli account create --name <account-name>
    ```

2. **Request Testnet Tokens**

    Visit the [Oasis Faucet](https://faucet.testnet.oasis.dev/) to request testnet tokens.

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

3. **Build the ROFL Application**

    For MacOS users, use the following Docker image:

    ```bash
    docker run --platform linux/amd64 --volume .:/src --rm -it ghcr.io/oasisprotocol/rofl-dev:main
    ```

    Inside the container, build the ROFL application:

    ```bash
    oasis rofl build --update-manifest
    ```

4. **Deploy the ROFL Application**

    You have two options for deployment:

    A. **Run Your Own Oasis Node**

    1. Follow the [Oasis Node Setup Guide](https://docs.oasis.io/node/run-your-node/paratime-client-node)
    2. Copy the ROFL bundle to your node
    3. Update your node configuration
    4. Restart your node

    B. **Deploy to Oasis Provider**

    1. Upload the ROFL bundle to a public file server
    2. Contact the Oasis team on [Discord](https://oasis.io/discord) #dev-central channel

### Verify TEE Deployment

Once deployed, you can verify the TEE deployment by:

1. Checking the ROFL application status:

    ```bash
    oasis rofl show
    ```

2. Monitoring the application logs
3. Verifying remote attestation

Congratulations! You have successfully deployed Eliza to a TEE environment.
