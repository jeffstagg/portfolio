## Measurable Impact

### Ease of Maintenance

- ✅ Educated teams in CQRS and Event Sourcing patterns
- ✅ New Staging capabilities were implemented seamlessly during development phases, ensuring no delays in producing new features as they were prioritized
- ✅ Backward compatibility to ensure existing workflows were not interrupted as new stores migrated onto new platform
- ✅ Feature flag deployment to allow new stores to adopt platform with an easy rollback

### Technical Wins

- **Event Sourcing** enabled us to replay events in situations where data needed to be corrected to establish state, without triggering events that may impact customer communication
- **Domain Responsibility** was reestablished and documented to align closer with bounded contexts and committed domain capabilities
- **More Agile Feature Improvements** allowing workflows to be more agile allowed us to move into newer methodologies such as letting third parties stage items, non-human entities staging items, and easier integration with software capable of locker storage

### Lessons Learned

1. **Domain Alignment is key** - Understanding which domain is responsible for which data was pivotal in ensuring teams knew exactly what they need to work on and how to collaborate
2. **Educating Engineers can make or break the project** - The existing teams of engineers responsible for this data were not experienced in cloud technology, event sourcing, or CQRS patterns. We became somewhat lax in the CQRS effort in an attempt to get most benefits of layered architecture, while ensuring teams weren't biting off more than they could chew
3. **Iterative approach** - Piecing together this large project enabled us to quickly pivot as budgets were reprioritized, allowing us to work in small segments for new features, keeping tech teams and business alike happy with progress