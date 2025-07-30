### User Story 1: Fix Card Creation Description
**As a** user, **I want to** the `description` field in the `add_card_to_list` tool to work correctly, **so that** I can create detailed cards.

**Actions to Undertake:**
1.  **Filepath**: `src/validators.ts`
    -   **Action**: Update the `validateAddCardRequest` function to correctly handle the optional `description` field.
    -   **Implementation**:
        ```typescript
        // Existing validation logic...
        description: z.string().optional(),
        // ...
        ```
    -   **Imports**: `import { z } from 'zod';` (already present)
2.  **Filepath**: `src/trello-client.ts`
    -   **Action**: Ensure the `addCard` method in `TrelloClient` passes the `desc` parameter to the Trello API.
    -   **Implementation**:
        ```typescript
        async addCard(listId: string, name: string, desc?: string): Promise<any> {
            const params: any = {
                idList: listId,
                name: name,
            };
            if (desc) {
                params.desc = desc;
            }
            return this.post('/cards', params);
        }
        ```
    -   **Imports**: None.
3.  **Filepath**: `src/index.ts`
    -   **Action**: Update the `add_card_to_list` tool definition to include the `description` parameter and pass it to the `trelloClient.addCard` method.
    -   **Implementation**:
        ```typescript
        // ... inside the tool definition
        parameters: {
            type: 'object',
            properties: {
                list_id: {
                    type: 'string',
                    description: 'The ID of the list to add the card to.',
                },
                name: {
                    type: 'string',
                    description: 'The name of the card to create.',
                },
                description: {
                    type: 'string',
                    description: 'The description for the card.',
                },
            },
            required: ['list_id', 'name'],
        },
        // ... inside the handler
        const { list_id, name, description } = validateAddCardRequest(params);
        const card = await trelloClient.addCard(list_id, name, description);
        ```
    -   **Imports**: None.

**Acceptance Criteria:**
-   The `add_card_to_list` tool accepts an optional `description` parameter.
-   When the `description` is provided, it appears correctly on the created Trello card.
-   The `validateAddCardRequest` function in `src/validators.ts` correctly validates the `description` field.
-   The `addCard` method in `src/trello-client.ts` correctly passes the `desc` parameter to the Trello API.

**Testing Plan:**
-   **Test Case 1**: Call the `add_card_to_list` tool with a `name` and `list_id`, but no `description`. Verify the card is created without a description.
-   **Test Case 2**: Call the `add_card_to_list` tool with a `name`, `list_id`, and a `description`. Verify the card is created with the correct description.
-   **Test Case 3**: Call the `add_card_to_list` tool with invalid input for the `description` (e.g., a number) and verify a validation error is returned.