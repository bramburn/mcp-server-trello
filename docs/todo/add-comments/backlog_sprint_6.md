### User Story 6: Add Labels to Card
**As a** user, **I want** to add one or more existing labels to a card, **so that** I can categorize and prioritize it.

**Actions to Undertake:**
1.  **Filepath**: `src/validators.ts`
    -   **Action**: Create a validation schema for the `add_labels_to_card` tool.
    -   **Implementation**:
        ```typescript
        export const addLabelsToCardRequestSchema = z.object({
          card_id: z.string(),
          label_ids: z.array(z.string()),
        });

        export const validateAddLabelsToCardRequest = (params: any) => {
          return addLabelsToCardRequestSchema.parse(params);
        };
        ```
    -   **Imports**: `import { z } from 'zod';`
2.  **Filepath**: `src/trello-client.ts`
    -   **Action**: Add an `addLabelsToCard` method to the `TrelloClient`.
    -   **Implementation**:
        ```typescript
        async addLabelsToCard(cardId: string, labelIds: string[]): Promise<any> {
            // The Trello API expects a comma-separated string of label IDs
            const value = labelIds.join(',');
            return this.post(`/cards/${cardId}/idLabels`, { value });
        }
        ```
    -   **Imports**: None.
3.  **Filepath**: `src/index.ts`
    -   **Action**: Define the new `add_labels_to_card` tool.
    -   **Implementation**:
        ```typescript
        {
          type: 'function',
          function: {
            name: 'add_labels_to_card',
            description: 'Adds one or more labels to a specific card.',
            parameters: {
              type: 'object',
              properties: {
                card_id: {
                  type: 'string',
                  description: 'The ID of the card to add labels to.',
                },
                label_ids: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'An array of label IDs to add to the card.',
                },
              },
              required: ['card_id', 'label_ids'],
            },
            handler: async (params: any) => {
              try {
                const { card_id, label_ids } = validateAddLabelsToCardRequest(params);
                const result = await trelloClient.addLabelsToCard(card_id, label_ids);
                return { success: true, labels: result };
              } catch (error) {
                // ... error handling
              }
            },
          },
        }
        ```
    -   **Imports**: `validateAddLabelsToCardRequest` from `./validators.ts`.

**Acceptance Criteria:**
-   A new tool `add_labels_to_card` is created.
-   The tool uses the `POST /1/cards/{id}/idLabels` endpoint.
-   It accepts a `card_id` and a `label_ids` array.
-   The tool successfully associates the specified labels with the card.
-   The tool returns the new list of all labels on the card.

**Testing Plan:**
-   **Test Case 1**: Get available board labels. Add one of those labels to a card and verify it was added.
-   **Test Case 2**: Add multiple labels to a card in a single call and verify they are all added.
-   **Test Case 3**: Try to add a label that is already on the card. Verify the operation succeeds without creating duplicates.
-   **Test Case 4**: Try to add a label ID that does not exist on the board. Verify the Trello API returns an error that is handled gracefully.
-   **Test Case 5**: Call the tool with a missing `card_id` or `label_ids` and verify a validation error is returned.
