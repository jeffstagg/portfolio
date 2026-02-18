## The Challenge

Kroger's fulfillment systems were set up as a series of strict workflows, and had begun migrating toward a style of Domain Driven Design. The majority of their platform was on-prem, using a Kafka implementation and SQL Server for the vast majority of their data. They were looking to migrate to Azure, and wanted to be more agile in how they handled their order fulfillment.

The problems they faced related to Staging / Destaging:
- Data duplication - Selection would create containers to hold items, and Staging was recreating those containers to be its own source of truth
- Hard-coded staging locations meant many 'workarounds' to add new staging features
- If issues arose, event playback was very difficult and time consuming
- If another entity needed to stage containers,  event data needed to be falsified to make it happen
### Architecture Before

![[Experiences/Kroger/Staging Modernization/Existing Solution.canvas]]

**Key Issues:**
1. Data duplication lead to consistency errors
2. Processes fired off events through rigid workflows unexpectedly
3. Event playback meant sometimes firing off workflows that impacted customer experience
4. Third-Party partners could not effectively stage orders without using a Kroger device
5. Staging handling data that did not belong in the same domain

### Business Impact

The existing system could not support new staging methodologies when needed. When wanting to add new methods of staging for customers to pick up orders, the effort would take many months of development and workarounds, leading Kroger to abandon these new features.