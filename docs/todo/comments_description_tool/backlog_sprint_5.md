### User Story 5: View Card Labels
**As a** user, **I want** to see the labels on a specific card, **so that** I can understand its context and categorization.

**Actions to Undertake:**
1.  **Filepath**: `src/validators.ts`
    -   **Action**: Create a validation schema for the `get_card_labels` tool.
    -   **Implementation**:
        ```typescript
        export const getCardLabelsRequestSchema = z.object({
          card_id: z.string(),
        });

        export const validateGetCardLabelsRequest = (params: any) => {
          return getCardLabelsRequestSchema.parse(params);
        };
        ```
    -   **Imports**: `import { z } from 'zod';`
2.  **Filepath**: `src/trello-client.ts`
    -   **Action**: Add a `getCardLabels` method to the `TrelloClient`.
    -   **Implementation**:
        ```typescript
        async getCardLabels(cardId: string): Promise<any[]> {
            const card = await this.get(`/cards/${cardId}?fields=labels`);
            return card.labels || [];
        }
        ```
    -   **Imports**: None.
3.  **Filepath**: `src/index.ts`
    -   **Action**: Define the new `get_card_labels` tool.
    -   **Implementation**:
        ```typescript
        {
          type: 'function',
          function: {
            name: 'get_card_labels',
            description: 'Gets the labels applied to a specific card.',
            parameters: {
              type: 'object',
              properties: {
                card_id: {
                  type: 'string',
                  description: 'The ID of the card to get labels from.',
                },
              },
              required: ['card_id'],
            },
            handler: async (params: any) => {
              try {
                const { card_id } = validateGetCardLabelsRequest(params);
                const labels = await trelloClient.getCardLabels(card_id);
                return { success: true, labels: labels.map(l => ({ id: l.id, name: l.name, color: l.color })) };
              } catch (error) {
                // ... error handling
              }
            },
          },
        }
        ```
    -   **Imports**: `validateGetCardLabelsRequest` from `./validators.ts`.

**Acceptance Criteria:**
-   A new tool `get_card_labels` is created.
-   The tool uses the `GET /1/cards/{id}?fields=labels` endpoint.
-   It accepts a `card_id` as a required parameter.
-   The tool returns a list of label objects applied to that card.
-   If the card has no labels, an empty list is returned.

**Testing Plan:**
-   **Test Case 1**: Create a card and add several labels to it. Call the tool with the card's ID and verify it returns the correct labels.
-   **Test Case 2**: Create a card with no labels. Call the tool and verify it returns an empty list.
-   **Test Case 3**: Call the tool with an invalid or non-existent card ID and verify the Trello API error is handled gracefully.
-   **Test Case 4**: Call the tool without a `card_id` and verify a validation error is returned.