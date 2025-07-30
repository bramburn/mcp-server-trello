### User Story 3: Append to Card Description
**As a** user, **I want** a new tool to append text to a card's description, **so that** I can add updates without losing existing information.

**Actions to Undertake:**
1.  **Filepath**: `src/validators.ts`
    -   **Action**: Create a validation schema for the `append_to_card_description` tool.
    -   **Implementation**:
        ```typescript
        export const appendToCardDescriptionRequestSchema = z.object({
          card_id: z.string(),
          text_to_append: z.string(),
        });

        export const validateAppendToCardDescriptionRequest = (params: any) => {
          return appendToCardDescriptionRequestSchema.parse(params);
        };
        ```
    -   **Imports**: `import { z } from 'zod';`
2.  **Filepath**: `src/trello-client.ts`
    -   **Action**: Add a method to get the current description of a card.
    -   **Implementation**:
        ```typescript
        async getCardDescription(cardId: string): Promise<string> {
            const card = await this.get(`/cards/${cardId}?fields=desc`);
            return card.desc || '';
        }
        ```
    -   **Imports**: None.
3.  **Filepath**: `src/trello-client.ts`
    -   **Action**: Add an `appendToCardDescription` method that fetches, appends, and updates.
    -   **Implementation**:
        ```typescript
        async appendToCardDescription(cardId: string, textToAppend: string): Promise<any> {
            const currentDesc = await this.getCardDescription(cardId);
            const newDesc = currentDesc ? `${currentDesc}\n\n${textToAppend}` : textToAppend;
            return this.updateCardDescription(cardId, newDesc);
        }
        ```
    -   **Imports**: None.
4.  **Filepath**: `src/index.ts`
    -   **Action**: Define the new `append_to_card_description` tool.
    -   **Implementation**:
        ```typescript
        {
          type: 'function',
          function: {
            name: 'append_to_card_description',
            description: 'Appends text to the description of a specific card.',
            parameters: {
              type: 'object',
              properties: {
                card_id: {
                  type: 'string',
                  description: 'The ID of the card to update.',
                },
                text_to_append: {
                  type: 'string',
                  description: 'The text to append to the card description.',
                },
              },
              required: ['card_id', 'text_to_append'],
            },
            handler: async (params: any) => {
              try {
                const { card_id, text_to_append } = validateAppendToCardDescriptionRequest(params);
                await trelloClient.appendToCardDescription(card_id, text_to_append);
                return { success: true, message: 'Text appended to card description.' };
              } catch (error) {
                // ... error handling
              }
            },
          },
        }
        ```
    -   **Imports**: `validateAppendToCardDescriptionRequest` from `./validators.ts`.

**Acceptance Criteria:**
-   A new tool `append_to_card_description` is created.
-   The tool fetches the existing description via `GET /1/cards/{id}?fields=desc`.
-   It appends the new text with appropriate newlines.
-   It updates the card using `PUT /1/cards/{id}`.
-   A confirmation of success is returned.

**Testing Plan:**
-   **Test Case 1**: Use the tool on a card with an existing description. Verify the new text is appended correctly.
-   **Test Case 2**: Use the tool on a card with no initial description. Verify the description is set to the new text.
-   **Test Case 3**: Append multiple times to the same card and verify the description is built up correctly.
-   **Test Case 4**: Call the tool with a missing `card_id` or `text_to_append` and verify an error is returned.