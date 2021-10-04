# Welcome to Codelab.ai

We're building a web application builder that allows usage of all Ant Design components & all their props. We'll soon integrate other frameworks such as Material UI.

In short, we use a graph database & store the serialized Component tree there (which is naturally suitable for the DOM tree). Our user interface allows users to create a tree of React components.

We also built our own Interface abstraction, which allows users to define object types. These types map 1 to 1 with our components, and users can configure the props form (which is generated from the interface).

As for functions, we've integrated AWS Lambda and allows users to create their custom function handlers for components.

In addition to all Ant Design components, we've added several other of our own components to make building easier.

## Our progress

We currently can fetch remote data & render into a list of custom components. You can see it here.

https://youtu.be/OrmhGmr0iTA

## What's next

We have lots of features to add, such as adding a design system. For examples, tagging on components variants. Sharing components across applications & user accounts.

Adding other NPM libraries so the builder can access it like Google Map etc.

## The Task

You'll be given some data in json format, and you'll want to parse that data using a tree library. Then you'll run some algorithms on the data & output a specified format to pass several jest specs.

1. Run `yarn test` to see the 2 specs fail
2. Modify `graph.ts` to make the specs pass
