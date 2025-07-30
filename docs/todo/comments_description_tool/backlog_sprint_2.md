### User Story 2: Update Card Description
**As a** user, **I want** a new tool to update the entire description of a card, **so that** I can make substantial changes to it.

**Actions to Undertake:**
1.  **Filepath**: `src/validators.ts`
    -   **Action**: Create a validation schema for the `update_card_description` tool.
    -   **Implementation**:
        ```typescript
        export const updateCardDescriptionRequestSchema = z.object({
          card_id: z.string(),
          description: z.string(),
        });

        export const validateUpdateCardDescriptionRequest = (params: any) => {
          return updateCardDescriptionRequestSchema.parse(params);
        };
        ```
    -   **Imports**: `import { z } from 'zod';`
2.  **Filepath**: `src/trello-client.ts`
    -   **Action**: Add an `updateCardDescription` method to the `TrelloClient`.
    -   **Implementation**:
        ```typescript
        async updateCardDescription(cardId: string, description: string): Promise<any> {
            return this.put(`/cards/${cardId}`, { desc: description });
        }
        ```
    -   **Imports**: None.
3.  **Filepath**: `src/index.ts`
    -   **Action**: Define the new `update_card_description` tool.
    -   **Implementation**:
        ```typescript
        {
          type: 'function',
          function: {
            name: 'update_card_description',
            description: 'Updates the entire description of a specific card.',
            parameters: {
              type: 'object',
              properties: {
                card_id: {
                  type: 'string',
                  description: 'The ID of the card to update.',
                },
                description: {
                  type: 'string',
                  description: 'The new description for the card.',
                },
              },
              required: ['card_id', 'description'],
            },
            handler: async (params: any) => {
              try {
                const { card_id, description } = validateUpdateCardDescriptionRequest(params);
                await trelloClient.updateCardDescription(card_id, description);
                return { success: true, message: 'Card description updated successfully.' };
              } catch (error) {
                // ... error handling
              }
            },
          },
        }
        ```
    -   **Imports**: `validateUpdateCardDescriptionRequest` from `./validators.ts`.

**Acceptance Criteria:**
-   A new tool `update_card_description` is available.
-   The tool uses the `PUT /1/cards/{id}` endpoint.
-   It requires `card_id` and `description` parameters.
-   The card's description in Trello is completely replaced.
-   A success message is returned.

**Testing Plan:**
-   **Test Case 1**: Create a card with a description. Use the tool to update the description and verify the change in Trello.
-   **Test Case 2**: Use the tool to set a description for a card that initially has none.
-   **Test Case 3**: Use the tool to clear a card's description by providing an empty string.
-   **Test Case 4**: Call the tool with a missing `card_id` or `description` and verify an error is returned.