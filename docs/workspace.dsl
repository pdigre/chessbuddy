workspace "ChessBuddy" "A web-based chess application." {

    !identifiers hierarchical

    model {
        // --- People and Software Systems ---
        player = person "Player" "A user of the ChessBuddy application."
        
        chessBuddySystem = softwareSystem "ChessBuddy" "Allows users to play chess, analyze games, and connect with other players." {
            // --- Containers ---
            spa = container "Web Frontend" "The user-facing web application that runs in the browser." "React + Web Components" "Frontend"
            api = container "Backend API" "Handles business logic, game state, and persistence." "Bun.js / TypeScript" "Backend" {
                // --- Components ---
                // These components are logically part of the 'common' library but are used by the API.

                // This component represents the code in the 'common/model' directory.
                dataModelComponent = component "Data Model" "Defines core data structures (ListItem, Persist) and utility functions for property access." "TypeScript" "Model"
                
                // This component is inferred from 'common/service/rules.test.ts'.
                rulesServiceComponent = component "Rules Service" "Encapsulates chess rules and game state validation." "TypeScript" "Service"
                
                // This component is inferred from 'server/src/datastore.ts' being used in 'serve.ts'.
                datastoreComponent = component "Datastore" "Handles interaction with Google Cloud Firestore." "TypeScript" "Repository"
            }
            database = container "Database" "Stores game data, user profiles, and tasks." "Google Cloud Firestore" "Database"
        }

        // --- Relationships ---
        player -> chessBuddySystem.spa "Uses"
        chessBuddySystem.spa -> chessBuddySystem.api "Makes API calls to" "JSON/HTTP"
        chessBuddySystem.api -> chessBuddySystem.database "Reads from and writes to"
        chessBuddySystem.api.rulesServiceComponent -> chessBuddySystem.api.dataModelComponent "Uses"
        chessBuddySystem.api.datastoreComponent -> chessBuddySystem.api.dataModelComponent "Uses"
    }

    views {
        systemContext chessBuddySystem "SystemContext" {
            description "The System Context diagram for ChessBuddy, showing how it fits into its environment."
            include *
            autoLayout
        }

        container chessBuddySystem "Containers" {
            description "The Containers diagram for ChessBuddy, showing the high-level technical building blocks."
            include *
            autoLayout
        }
        
        component chessBuddySystem.api "BackendComponents" {
            description "A component diagram for the Backend API, showing how key components from the 'common' library are used."
            include *
            autoLayout
        }

        styles {
            element "Person" {
                shape Person
            }
            element "Software System" {
                background "#1168bd"
                color "#ffffff"
            }
            element "Container" {
                background "#438dd5"
                color "#ffffff"
            }
            element "Component" {
                background "#85bbf0"
                color "#000000"
            }
            element "Frontend" {
                shape WebBrowser
            }
            element "Backend" {
                shape Hexagon
            }
            element "Database" {
                shape Cylinder
            }
        }
    }
}