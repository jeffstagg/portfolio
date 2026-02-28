#!/usr/bin/env bash
# ─── Portfolio Seed Script (bash) ────────────────────────────────────────────
# Usage: ./seed.sh
# Requires the API to be running. Defaults to localhost:7071.
# Override with: API_BASE=http://portfolio-api:7071/api ./seed.sh
# ─────────────────────────────────────────────────────────────────────────────

set -e

if ! command -v jq &> /dev/null; then
  echo "Error: jq is required. Install with: sudo apt-get install -y jq"
  exit 1
fi

API="${API_BASE:-http://localhost:7071/api}"
RED='\033[0;31m'; GREEN='\033[0;32m'; CYAN='\033[0;36m'; NC='\033[0m'

echo ""
echo -e "${CYAN}Portfolio seed script${NC}"
echo -e "API: $API"
echo ""

# ─── Step 1: Create Experience ────────────────────────────────────────────────

echo -e "${CYAN}Creating Kroger experience...${NC}"

EXP_RESPONSE=$(curl -s -X POST "$API/experiences" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Principal Solutions Architect",
    "company": "Kroger",
    "period": "2021 - 2024",
    "employmentType": "Full-time",
    "location": "Remote",
    "highlights": [
      "Led architecture and delivery of the Instacart third-party fulfillment integration, deployed across 1,100 stores in year one and generating $9M+ in new revenue.",
      "Architected the Staging Modernization initiative, migrating Dispatch from on-prem SQL Server and Kafka to Azure CosmosDB and Azure Service Bus using Event Sourcing and CQRS.",
      "Facilitated Event Storming workshops and C4 Modeling sessions across 6 cross-functional development teams to align domain boundaries and data flows.",
      "Presented architecture proposals to the Architecture Review Board and led Failure Mode and Effects Analysis (FMEAs) to ensure production readiness.",
      "Drove adoption of Domain-Driven Design, bounded contexts, and cloud-native patterns across multiple engineering teams transitioning from on-prem monoliths."
    ]
  }')

EXP_ID=$(echo "$EXP_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$EXP_ID" ]; then
  echo -e "${RED}Failed to create experience. Response:${NC}"
  echo "$EXP_RESPONSE"
  exit 1
fi

echo -e "${GREEN}Created experience: $EXP_ID${NC}"

# ─── Step 2: Instacart Integration project ───────────────────────────────────

echo ""
echo -e "${CYAN}Creating Instacart Integration project...${NC}"

INSTACART_PROBLEM='## The Challenge

Kroger had taken initial steps to integrate third-party fulfillment providers into their online grocery pickup orders. They had an initial solution to allow Instacart to submit orders after Instacart shoppers had already selected the items for the order, but the solution was buggy and data was at times being lost during integration.

Kroger associates had to have Instacart software installed on their devices, which required contracts and risked security of internal devices from third-party code. They needed a way to integrate third-party fulfillment providers from the initial order process, and allow third parties to handle selection of items for an order.

They needed a solution without:
- Installing external software on internal systems
- Compromising security
- Disrupting existing operations

### Architecture Before

```mermaid
graph TD
    A[Partner API] --> B[Selection]
    B[Selection] --> C[Dispatch]
```

**Key Issues:**
1. Kroger generating Order data to back-fill data requirements
2. Unsure when Customer was coming, they just showed up
3. Third-Party Software installed on associate devices leading to security concerns
4. Not designed to scale to new partners

### Business Impact

The existing system could not support the growing demand for third-party delivery services, limiting revenue opportunities and customer satisfaction. We also needed to move third-party applications off of Kroger devices.'

INSTACART_SOLUTION='## My Solution

While the existing system worked for a limited amount of orders, I wanted to build a system that would work seamlessly with our rigid workflows, and plan to start diversifying our strategy into a series of orchestrations to allow third parties to take over any step of our fulfillment process — from ingesting orders from multiple sources, to allowing third parties to select the order, different parties to stage / destage orders, without having to change business logic any time a new partner was added.

### Architecture

```mermaid
graph TD
    A[Partner API] --> B[Partner Adapter]
    B --> C[Service Orchestration]
    C --> D[Selection]
    C --> E[Staging/Dispatch]

    style A fill:#0A1628
    style B fill:#0A1628
    style C fill:#22D3EE
```

### Key Decisions

1. **Partner API** - To consolidate order data into a repeatable fashion to quickly bring in new third party providers
2. **Service Orchestration** - To treat each step in fulfillment as a piece that can be replaced by third parties, or non-human entities

### Services Performed

- Worked closely with Business, Product Designers and Product Managers to understand full set of needs from Partner orders
- Facilitated Event Storming workshops to quickly lay out paths of data flow to ensure we could identify all necessary interfaces between Instacart and Kroger
- C4 Modeling ensured responsible domains within Kroger understood what was to be built and how data would flow
- Coordinated a plan for development and provided guidance between 6 development teams
- Data Mapping sessions ensured each interface was sufficient to capture data necessary to fill all requirements
- Led Failure Mode and Effects Analysis (FMEAs) with engineering teams
- Presented plan to Architecture Review Board for approval
- Worked closely with Support team to provide documentation for error identification and remediation'

INSTACART_IMPACT='### Deployment Success

- ✅ **1,100 stores** deployed in year one
- ✅ Expanding to **2,800 stores** in year two
- ✅ **$9M+ in new revenue** generated
- ✅ **Zero security incidents**

### Scalability Achieved

```mermaid
graph LR
    A[Week 1: 10 stores] --> B[Month 1: 100 stores]
    B --> C[Month 3: 500 stores]
    C --> D[Month 6: 1,100 stores]
    D --> E[Year 2: 2,800 stores]

    style E fill:#22D3EE
```

### Technical Wins

- **Introducing Orchestrations** enabled us to pivot away from rigid event workflows and tightly coupled domains into loosely coupled domains that could handle units of work as they are assigned
- **Real-time monitoring** with event monitoring
- **Easier Debugging** through splitting events into smaller logical steps

### Lessons Learned

1. **Start with events** - Event storming early in the process saved months of rework
2. **Security by design** - Removing codebases not under our control ensured data breaches were the sole responsibility of Kroger
3. **Partner collaboration** - Close work with Instacart ensured smooth integration
4. **Iterative approach** - Starting with limited stores allowed us to refine before scaling'

PROJ1_RESPONSE=$(curl -s -X POST "$API/experiences/$EXP_ID/projects" \
  -H "Content-Type: application/json" \
  -d "$(jq -n \
    --arg title "Instacart Fulfillment Integration" \
    --arg company "Kroger" \
    --arg timeline "2022 - 2023" \
    --arg problem "$INSTACART_PROBLEM" \
    --arg solution "$INSTACART_SOLUTION" \
    --arg impact "$INSTACART_IMPACT" \
    '{
      title: $title,
      company: $company,
      timeline: $timeline,
      problem: $problem,
      solution: $solution,
      impact: $impact,
      technologies: [
        "Apache Kafka",
        "Event-Driven Architecture",
        "Service Orchestration",
        "C4 Modeling",
        "Domain-Driven Design",
        "Event Storming",
        "Azure"
      ]
    }')")

PROJ1_ID=$(echo "$PROJ1_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
echo -e "${GREEN}Created project: $PROJ1_ID — Instacart Fulfillment Integration${NC}"

# ─── Step 3: Staging Modernization project ───────────────────────────────────

echo ""
echo -e "${CYAN}Creating Staging Modernization project...${NC}"

STAGING_PROBLEM='## The Challenge

Kroger'\''s fulfillment systems were set up as a series of strict workflows, and had begun migrating toward Domain-Driven Design. The majority of their platform was on-prem, using a Kafka implementation and SQL Server for the vast majority of their data. They were looking to migrate to Azure, and wanted to be more agile in how they handled their order fulfillment.

The problems they faced related to Staging / Destaging:
- **Data duplication** — Selection would create containers to hold items, and Staging was recreating those containers to be its own source of truth
- **Hard-coded staging locations** meant many workarounds to add new staging features
- **Event playback was very difficult** and time consuming when issues arose
- **Third-party partners could not effectively stage orders** without using a Kroger device
- **Staging handling data that did not belong in the same domain**

### Architecture Before

```mermaid
graph TD
    A[Order Ingestion] --> B[Selection]
    B --> C[Staging - SQL Server]
    B --> D[Destaging - SQL Server]
    C --> E[EPOS]
    D --> E
```

**Key Issues:**
1. Data duplication led to consistency errors
2. Processes fired off events through rigid workflows unexpectedly
3. Event playback sometimes triggered workflows that impacted customer experience
4. Third-party partners could not effectively stage orders without a Kroger device
5. Staging handling data that did not belong in the same domain

### Business Impact

The existing system could not support new staging methodologies. Adding new methods of staging would take many months of development and workarounds, leading Kroger to abandon new features entirely.'

STAGING_SOLUTION='## My Solution

The system needed a modernization process across multiple dimensions:

- Decouple Dispatch data from Selection data
- Refine the domain responsibilities for Dispatch into a more defined bounded context
- Create an Orchestrator to handle how orders are fulfilled through a series of Work Orders
- Redesign Dispatch using an Event Sourcing pattern
- Refactor Dispatch code using CQRS
- Move Dispatch from on-prem SQL Server and Kafka to Azure CosmosDB and Azure Service Bus
- Generate outputs to allow Data Engineers to consume Staging and Destaging capacity data for ML/AI capacity prediction models

### Architecture After

```mermaid
graph TD
    E[Order Ingestion] --> A[Order Orchestrator]
    A --> B[Selection]
    A --> C[Dispatch]
    A --> D[Payment]

    style A fill:#22D3EE
    style E fill:#0A1628
```

### Key Decisions

1. **Domain Redefinition** — Dispatch removed capabilities related to being a source of truth for containers. Container ownership now belonged solely with Selection.
2. **Event Sourcing Pattern** — Dispatch would not store relational data, instead using an Event Sourcing pattern to provide a ledger of container movement and current state of container locations.
3. **Microservices Topology** — Dispatch moved from an on-prem monolithic API to a CQRS pattern using microservices that could scale depending on load.

### Services Performed

- Worked closely with Security team, partner Architect, and Product Managers to plan the modernization effort
- Facilitated Event Storming workshops across Order Management, Selection, Dispatch and Payment teams
- Domain Analysis to ensure all capabilities were accounted for in their correct domain
- C4 Modeling ensured responsible domains understood what was to be built and how data would flow
- Coordinated development guidance across 5 teams: Order Management, Selection (Cloud), Selection (On-Prem), Staging, Destaging / EPOS
- Led Failure Mode and Effects Analysis (FMEAs) with engineering teams
- Presented plan to Architecture Review Board for approval'

STAGING_IMPACT='### Ease of Maintenance

- ✅ Educated teams in CQRS and Event Sourcing patterns
- ✅ New staging capabilities implemented seamlessly during development with no feature delays
- ✅ Backward compatibility ensured existing workflows were not interrupted as new stores migrated
- ✅ Feature flag deployment allowed new stores to adopt the platform with easy rollback

### Technical Wins

- **Event Sourcing** enabled replaying events to correct state without triggering workflows that impact customer communication
- **Domain Responsibility** was reestablished and documented to align with bounded contexts and committed domain capabilities
- **More Agile Feature Improvements** — looser coupling enabled third-party staging, non-human entity staging, and locker storage integration

### Lessons Learned

1. **Domain alignment is key** — Understanding which domain is responsible for which data was pivotal in ensuring teams knew exactly what to build
2. **Educating engineers can make or break the project** — Existing teams were not experienced in cloud technology, event sourcing, or CQRS. We balanced pragmatism with best practices to avoid overwhelming teams
3. **Iterative approach** — Piecing together this large project enabled quick pivots as budgets were reprioritized'

PROJ2_RESPONSE=$(curl -s -X POST "$API/experiences/$EXP_ID/projects" \
  -H "Content-Type: application/json" \
  -d "$(jq -n \
    --arg title "Staging & Dispatch Modernization" \
    --arg company "Kroger" \
    --arg timeline "2023 - 2024" \
    --arg problem "$STAGING_PROBLEM" \
    --arg solution "$STAGING_SOLUTION" \
    --arg impact "$STAGING_IMPACT" \
    '{
      title: $title,
      company: $company,
      timeline: $timeline,
      problem: $problem,
      solution: $solution,
      impact: $impact,
      technologies: [
        "Azure CosmosDB",
        "Azure Service Bus",
        "Azure Functions",
        "Azure Redis Cache",
        "Apache Kafka",
        "Event Sourcing",
        "CQRS",
        "Domain-Driven Design",
        "Kubernetes",
        "C4 Modeling"
      ]
    }')")

PROJ2_ID=$(echo "$PROJ2_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
echo -e "${GREEN}Created project: $PROJ2_ID — Staging & Dispatch Modernization${NC}"

# ─── Done ─────────────────────────────────────────────────────────────────────

echo ""
echo -e "${GREEN}Seeding complete!${NC}"
echo "  Experience ID : $EXP_ID"
echo "  Project 1 ID  : $PROJ1_ID"
echo "  Project 2 ID  : $PROJ2_ID"
echo ""
echo -e "${CYAN}View your portfolio at http://localhost:5173${NC}"
