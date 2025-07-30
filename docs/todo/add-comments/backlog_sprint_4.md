### User Story 4: View Board Labels
**As a** user, **I want** to view all available labels on the current board, **so that** I know what labels I can use for categorization.

**Actions to Undertake:**
1.  **Filepath**: `src/trello-client.ts`
    -   **Action**: Add a `getBoardLabels` method to the `TrelloClient`.
    -   **Implementation**:
        ```typescript
        async getBoardLabels(): Promise<any[]> {
            if (!this.boardId) {
                throw new Error('No active Trello board is set.');
            }
            return this.get(`/boards/${this.boardId}/labels`);
        }
        ```
    -   **Imports**: None.
2.  **Filepath**: `src/index.ts`
    -   **Action**: Define the new `get_board_labels` tool.
    -   **Implementation**:
        ```typescript
        {
          type: 'function',
          function: {
            name: 'get_board_labels',
            description: 'Gets all available labels for the active board.',
            parameters: { type: 'object', properties: {}, required: [] },
            handler: async () => {
              try {
                const labels = await trelloClient.getBoardLabels();
                return { success: true, labels: labels.map(l => ({ id: l.id, name: l.name, color: l.color })) };
              } catch (error) {
                // ... error handling
              }
            },
          },
        }
        ```
    -   **Imports**: None.

**Acceptance Criteria:**
-   A new tool `get_board_labels` is created.
-   The tool uses the `GET /1/boards/{id}/labels` endpoint.
-   It uses the active `boardId` from the `TrelloClient`.
-   It returns a list of label objects, each containing `id`, `name`, and `color`.
-   An error is returned if no active board is set.

**Testing Plan:**
-   **Test Case 1**: Set an active board that has several labels. Call the tool and verify it returns the correct list of labels.
-   **Test Case 2**: Set an active board that has no labels. Call the tool and verify it returns an empty list.
-   **Test Case 3**: Do not set an active board. Call the tool and verify it returns an error message.