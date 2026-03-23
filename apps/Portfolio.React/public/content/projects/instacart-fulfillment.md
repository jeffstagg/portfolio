---
id: instacart-fulfillment
experience: kroger
title: Instacart Fulfillment Integration
company: Kroger
timeline: "Jun 2024 - Dec 2024"
technologies:
  - Apache Kafka
  - Event-Driven Architecture
  - Service Orchestration
  - C4 Modeling
  - Domain-Driven Design
  - Event Storming
  - Azure
---

## The Challenge

Kroger had taken initial steps to integrate Instacart into their online grocery pickup operations, but the first phase left significant gaps. Orders weren't visible to Kroger until after an Instacart shopper had already selected and paid for items, customers arrived for pickup with no advance notification, and Instacart software running on associate devices created security exposure. A second phase was scoped to address these gaps, building a proper integration from the initial order through fulfillment, but the effort needed architectural leadership to bring it to completion.

### Architecture Before

![Existing Solution Diagram](/content/images/kroger-instacart-existing-solution.png)
![Existing Event Storm](/content/images/kroger-instacart-existing-event-storm.png)

**Key Issues:**

1. Unsure when Customer was coming, they just showed up
2. Third-Party Software installed on associate devices leading to security concerns
3. Not designed to scale to new partners

---

## My Solution

When I joined the project, the Partner API and adapter were already in progress. My focus was closing the remaining design gaps and ensuring every team had the data they needed at the right step in the workflow. I worked within Kroger's existing event-driven workflows, making targeted changes rather than rebuilding from scratch, and coordinated across six teams to bring the integration to completion. Through this process I began identifying opportunities for a more flexible orchestration model that could support future partners without requiring changes to core business logic.

### Architecture

![Updated Solution Diagram](/content/images/kroger-instacart-updated-solution.png)
> Where the previous integration handed off a completed order to Kroger late in the process, the updated architecture moves that handoff to the very beginning, giving Kroger full visibility from the moment an order is placed.

![Updated Event Storm](/content/images/kroger-instacart-updated-event-storm.png)

### Key Decisions

1. **Data contracts at each interface** : Defined what data needed to be present at each step in the workflow to eliminate existing order data backfilling issues from Phase 1 and ensure a consistent integration
2. **Event Sequencing** - Ensured the order of operations across teams stayed consistent to ensure downstream services received complete data at the right time

### Technologies Used

- **Apache Kafka** - For messaging
- **Event-Driven Architecture** - For event sequencing

## Services Performed

- Worked closely with Business, Product Designers and Product Managers to understand full set of needs from Partner orders, and ensure that requirements were documented to understand a Definition of Done
- Facilitated Event Storming workshops to quickly lay out paths of data flow to ensure we could identify all necessary interfaces between Instacart and Kroger
- C4 Modeling ensured responsible domains within Kroger understood what was to be built and how data would flow
- Coordinated a plan for development and provided guidance between 6 development teams
	- Order Management
	- Item Selection (On-Prem)
	- Item Selection (Cloud)
	- Staging
	- Dispatch
	- Instacart development team
- Data Mapping sessions ensured each interface was sufficient to capture data necessary to fill all requirements
- Led Failure Mode and Effects Analysis (FMEAs) with engineering teams to ensure we had an answer for any situation that could go wrong
- Presented plan to Architecture Review Board for approval
- Worked closely with Support team to understand details of new feature, and provide documentation for knowing when an error has occurred, how to check, and how to rectify

---

## Measurable Impact

### Deployment Success

- **1,100 stores** deployed in year one
- Expanding to **2,800 stores** in year two
- **Significant new revenue stream** generated
- **Zero security incidents**

### Scalability Achieved
  

```mermaid

graph LR

    A[Week 1: 10 stores] --> B[Month 1: 100 stores]

    B --> C[Month 3: 500 stores]

    C --> D[Month 6: 1,100 stores]

    D --> E[Year 2: 2,800 stores]

    style E fill:#95e1d3

```

### Technical Wins

- **Real-time monitoring** with event monitoring
- **Easier Debugging** through splitting events into smaller logical steps rather than backfilling data that may not have been received 

### Lessons Learned

1. **Event Storming** - Introducing Event Storming mid-project gave the team a shared language and reference point that kept six teams aligned across a complex integration
2. **Security by design** - Removing codebases that were not under our control to ensure data breaches were the sole responsibility of Kroger
3. **Partner collaboration** - Close work with Instacart ensured smooth integration
4. **Iterative approach** - Starting with limited stores allowed us to refine before scaling