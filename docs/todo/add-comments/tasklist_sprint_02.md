### Task List: Sprint 2 - Add Comment

**Objective:** Create an `add_comment_to_card` tool that allows users to post a new comment to a Trello card.

**Methodology:** Test-Driven Development (TDD)

---

#### **Part 1: Trello Client Method (`addCommentToCard`)**

1.  **Write Failing Test for `addCommentToCard`:**
    *   **Action:** Add a new test case to `src/tests/trello-client.test.ts` that asserts the `addCommentToCard` method successfully posts a comment.
    *   **Filepath:** `src/tests/trello-client.test.ts`
    *   **Details:** Mock the `axios.post` call. The test should verify that the method is called with the correct `cardId` and `text` and returns the expected success response.

2.  **Implement `addCommentToCard` Method:**
    *   **Action:** Add the `addCommentToCard` method to the `TrelloClient` class.
    *   **Filepath:** `src/trello-client.ts`
    *   **Implementation:**
        ```typescript
        async addCommentToCard(cardId: string, text: string): Promise<any> {
          try {
            const response = await this.axios.post(`/cards/${cardId}/actions/comments`, null, {
              params: { text },
            });
            return response.data;
          } catch (error) {
            if (error.response && error.response.status === 404) {
              throw new Error(`Card with ID '${cardId}' not found.`);
            }
            console.error('Error adding comment to Trello:', error.message);
            throw new Error('Failed to add comment to Trello card.');
          }
        }
        ```

3.  **Run Tests:**
    *   **Action:** Execute the test suite.
    *   **Expected Result:** The test for `addCommentToCard` should now pass.

---

#### **Part 2: MCP Tool (`add_comment_to_card`)**

4.  **Write Failing Test for the Tool:**
    *   **Action:** Add a new test case to `src/tests/index.test.ts` for the `add_comment_to_card` tool.
    *   **Filepath:** `src/tests/index.test.ts`
    *   **Details:** The test should simulate calling the tool with a `card_id` and `comment_text`. It should assert that the tool returns a success status and the new `comment_id`.

5.  **Implement `add_comment_to_card` Tool:**
    *   **Action:** Add the new tool definition to the tools array in `index.ts`.
    *   **Filepath:** `src/index.ts`
    *   **Implementation:**
        ```typescript
        {
          name: 'add_comment_to_card',
          description: 'Add a new comment to a Trello card.',
          input_schema: {
            type: 'object',
            properties: {
              card_id: { type: 'string', description: 'The ID of the Trello card.' },
              comment_text: { type: 'string', description: 'The text of the comment to add.' },
            },
            required: ['card_id', 'comment_text'],
          },
          function: async ({ card_id, comment_text }: { card_id: string; comment_text: string }) => {
            try {
              const result = await trelloClient.addCommentToCard(card_id, comment_text);
              return { success: true, comment_id: result.id };
            } catch (error) {
              return { error: error.message };
            }
          },
        },
        ```

6.  **Run Final Tests:**
    *   **Action:** Execute the full test suite.
    *   **Expected Result:** All tests, including the new tool test, should pass.
