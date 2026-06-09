# Graph Report - .  (2026-06-09)

## Corpus Check
- Large corpus: 211 files · ~651,380 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 225 nodes · 244 edges · 21 communities detected
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.8)
- Token cost: 0 input · 200,000 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Utility Functions|Utility Functions]]
- [[_COMMUNITY_Access Control|Access Control]]
- [[_COMMUNITY_Blueprint Visualization|Blueprint Visualization]]
- [[_COMMUNITY_Visual Components|Visual Components]]
- [[_COMMUNITY_Form Components|Form Components]]
- [[_COMMUNITY_Services Module|Services Module]]
- [[_COMMUNITY_Animation Utilities|Animation Utilities]]
- [[_COMMUNITY_Concept Blocks|Concept Blocks]]
- [[_COMMUNITY_Project Display|Project Display]]
- [[_COMMUNITY_Camera Systems|Camera Systems]]
- [[_COMMUNITY_Hero Sections|Hero Sections]]
- [[_COMMUNITY_Contact Interface|Contact Interface]]
- [[_COMMUNITY_Design System|Design System]]
- [[_COMMUNITY_Industry Solutions|Industry Solutions]]
- [[_COMMUNITY_Navigation|Navigation]]
- [[_COMMUNITY_Project Details|Project Details]]
- [[_COMMUNITY_Surveillance|Surveillance]]
- [[_COMMUNITY_Infrastructure|Infrastructure]]
- [[_COMMUNITY_Services|Services]]
- [[_COMMUNITY_Fire Protection|Fire Protection]]
- [[_COMMUNITY_Isolated Component|Isolated Component]]

## God Nodes (most connected - your core abstractions)
1. `ImageSlot` - 17 edges
2. `fwin()` - 5 edges
3. `setSlot()` - 5 edges
4. `poly()` - 4 edges
5. `IndustrySOC()` - 4 edges
6. `save()` - 4 edges
7. `iso()` - 3 edges
8. `swin()` - 3 edges
9. `fmtTime()` - 3 edges
10. `formatDate()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `save()` --calls--> `W()`  [INFERRED]
  image-slot.js → industry-art-2d.jsx
- `dcExport()` --calls--> `save()`  [INFERRED]
  design-canvas.jsx → image-slot.js
- `Process()` --calls--> `ProcessWalker()`  [INFERRED]
  sections.jsx → animations.jsx

## Communities

### Community 0 - "Utility Functions"
Cohesion: 0.14
Nodes (9): dcExport(), clampS(), getSlot(), ImageSlot, load(), save(), setSlot(), toDataUrl() (+1 more)

### Community 1 - "Access Control"
Cohesion: 0.13
Nodes (7): Box(), fwin(), Industrial(), iso(), poly(), Retail(), swin()

### Community 2 - "Blueprint Visualization"
Cohesion: 0.1
Nodes (0): 

### Community 3 - "Visual Components"
Cohesion: 0.1
Nodes (0): 

### Community 4 - "Form Components"
Cohesion: 0.17
Nodes (0): 

### Community 5 - "Services Module"
Cohesion: 0.18
Nodes (0): 

### Community 6 - "Animation Utilities"
Cohesion: 0.2
Nodes (4): Counter(), ProcessWalker(), useCountUp(), Process()

### Community 7 - "Concept Blocks"
Cohesion: 0.2
Nodes (0): 

### Community 8 - "Project Display"
Cohesion: 0.2
Nodes (0): 

### Community 9 - "Camera Systems"
Cohesion: 0.2
Nodes (0): 

### Community 10 - "Hero Sections"
Cohesion: 0.24
Nodes (3): dcFlatten(), DCSection(), DesignCanvas()

### Community 11 - "Contact Interface"
Cohesion: 0.22
Nodes (0): 

### Community 12 - "Design System"
Cohesion: 0.25
Nodes (0): 

### Community 13 - "Industry Solutions"
Cohesion: 0.25
Nodes (0): 

### Community 14 - "Navigation"
Cohesion: 0.48
Nodes (5): fmtTime(), IndustrySOC(), pad(), useCountUp(), useNow()

### Community 15 - "Project Details"
Cohesion: 0.38
Nodes (3): BlogCard(), BlogFeatured(), formatDate()

### Community 16 - "Surveillance"
Cohesion: 0.29
Nodes (0): 

### Community 17 - "Infrastructure"
Cohesion: 0.33
Nodes (0): 

### Community 18 - "Services"
Cohesion: 0.33
Nodes (0): 

### Community 19 - "Fire Protection"
Cohesion: 0.4
Nodes (0): 

### Community 20 - "Isolated Component"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **Thin community `Isolated Component`** (1 nodes): `icons.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `W()` connect `Utility Functions` to `Blueprint Visualization`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Should `Utility Functions` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._
- **Should `Access Control` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._
- **Should `Blueprint Visualization` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Visual Components` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._