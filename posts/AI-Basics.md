---
title: "AI Basics"
subtitle: "AI Basic jargons to get started"
date: "2024-01-18"
---
# Knowledge, Reasoning & Planning

## Reasoning

### Knowledge-Based Agent

- A **knowledge-based agent** is a sophisticated system designed to utilize knowledge for decision-making and problem-solving.

- Components:
  - **Knowledge Base (KB)**: A repository of information about the world, often represented in a formal language.
  
  - **Inference Engine**: Processes information from the knowledge base to draw conclusions and make decisions.
  
  - **Sensors**: Collect data from the environment.
  
  - **Actuators**: Execute actions based on conclusions drawn.

- Reasoning techniques include logical and probabilistic reasoning.

### Propositional Logic

- **Propositional logic** deals with propositions, which are statements that are either true or false.

- Variables represent propositions, and logical connectives (AND, OR, NOT) are used to form compound propositions.

- Propositional logic is suitable for expressing relationships and conditions in a simple, binary manner.

### Inference

- **Inference** is the process of deriving new information from existing knowledge.

- In propositional logic, inference can involve both deduction and induction.

- **Deductive inference** derives conclusions that must be true if the premises are true, based on logical rules.

- **Inductive inference** involves making generalizations based on patterns observed in specific examples.

### Predicate Logic (First Order Logic)

- **Predicate logic**, or first-order logic, extends propositional logic by introducing variables, quantifiers, and predicates.

- Variables represent objects, quantifiers (existential and universal) specify the scope of variables, and predicates represent relationships.

- It allows for a more expressive representation of knowledge and is commonly used in AI.

### Resolution

- **Resolution** is a logical inference technique in predicate logic.

- It involves the resolution rule, which eliminates redundant clauses and facilitates the derivation of new clauses.

- Resolution is a foundational step in automated theorem proving and logical reasoning.

## Structured Knowledge Representation

### Frames

- **Frames** provide a structured way to represent knowledge about objects and concepts.

- A frame consists of slots (attributes) and values associated with those slots.

- Frames are used for organizing and representing complex, hierarchical relationships.

### Semantic Nets

- **Semantic nets**, or semantic networks, offer a graphical representation of knowledge using nodes and links.

- Nodes represent concepts, and links represent relationships between concepts.

- Semantic nets provide a visual and intuitive representation of semantic relationships.

## Planning

### A Simple Planning Agent

- A **planning agent** formulates and executes plans to achieve specific goals.

- Components include:
  - **Goal formulation**: Defining the desired outcome.
  
  - **Problem formulation**: Representing the initial state, goal state, and possible actions.
  
  - **Search for a solution**: Exploring the state space to find a sequence of actions from the initial to the goal state.

### From Problem Solving to Planning

- Planning involves reasoning about actions and their consequences to achieve goals.

- In contrast to problem-solving agents, planning agents operate in dynamic environments with changing states.

- Planning requires generating action sequences that transform an initial state into a desired goal state.

### Basic Representation of Plans

- **Plans** are representations of sequences of actions or steps that an agent can execute to achieve a goal.

- Plans can be represented as lists of actions or in a structured format.

- A complete and feasible plan is necessary for achieving goals in dynamic environments.

### Partial Order Planning

- **Partial Order Planning** allows for flexibility in the execution order of actions.

- Instead of a strict linear order, actions are partially ordered based on dependencies and constraints.

- Partial Order Planning is valuable in environments with uncertain action effects.

### Hierarchical Planning

- **Hierarchical Planning** organizes plans into hierarchies with subgoals and subplans.

- Subgoals are intermediate objectives contributing to the overall goal.

- Hierarchical Planning simplifies the representation of complex plans.
