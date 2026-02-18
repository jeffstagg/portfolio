## Measurable Impact

### Deployment Success

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


```

### Technical Wins

- **Introducing Orchestrations** enabled us to pivot away from rigid event workflows and tightly coupled domains, into loosely coupled domains that could handle units of work as they are assigned
- **Real-time monitoring** with event monitoring
- **Easier Debugging** through splitting events into smaller logical steps rather than backfilling data that may not have been received 

### Lessons Learned

1. **Start with events** - Event storming early in the process saved months of rework
2. **Security by design** - Removing codebases that were not under our control to ensure data breaches were the sole responsibility of Kroger
3. **Partner collaboration** - Close work with Instacart ensured smooth integration
4. **Iterative approach** - Starting with limited stores allowed us to refine before scaling