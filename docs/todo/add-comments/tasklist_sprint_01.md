### Task List: Sprint 1 - Read Comments

**Objective:** Create a `get_card_comments` tool that allows users to read all comments on a Trello card in chronological order.

**Methodology:** Test-Driven Development (TDD)

---

#### **Part 1: Trello Client Method (`getCardComments`)**

1.  **Create Test File:**
    *   **Action:** Create a new test file for the Trello client.
    *   **Filepath:** `src/tests/trello-client.test.ts`
    *   **Note:** If this file or a similar test setup doesn't exist, create it and configure the test environment (e.g., Jest, Mocha/Chai).

2.  **Write Failing Test for `getCardComments`:**
    *   **Action:** Add a new test case to `trello-client.test.ts` that asserts the `getCardComments` method retrieves comments for a card. Mock the `axios.get` call to simulate a Trello API response.
    *   **Filepath:** `src/tests/trello-client.test.ts`
    *   **Details:** The test should check that the method returns a list of comments, correctly ordered chronologically (oldest first).

3.  **Implement `getCardComments` Method:**
    *   **Action:** Add the `getCardComments` method to the `TrelloClient` class.
    *   **Filepath:** `src/trello-client.ts`
    *   **Implementation:**
        ```typescript
        async getCardComments(cardId: string): Promise<any> {
          try {
            const response = await this.axios.get(`/cards/${cardId}/actions`, {
              params: { filter: 'commentCard' },
            });
            // Trello returns newest first, so reverse for chronological order.
            return response.data.reverse();
          } catch (error) {
            if (error.response && error.response.status === 404) {
              throw new Error(`Card with ID '${cardId}' not found.`);
            }
            console.error('Error fetching comments from Trello:', error.message);
            throw new Error('Failed to get card comments from Trello.');
          }
        }
        ```

4.  **Run Tests:**
    *   **Action:** Execute the test suite.
    *   **Expected Result:** The test for `getCardComments` should now pass.

---

#### **Part 2: MCP Tool (`get_card_comments`)**

5.  **Write Failing Test for the Tool:**
    *   **Action:** Add a new test case to the main tool test file (e.g., `src/tests/index.test.ts`) for the `get_card_comments` tool.
    *   **Filepath:** `src/tests/index.test.ts`
    *   **Details:** The test should simulate calling the tool with a `card_id` and assert that it returns a formatted list of comments, including `comment_id`, `author`, `text`, and `date`.

6.  **Implement `get_card_comments` Tool:**
    *   **Action:** Add the new tool definition to the tools array in `index.ts`.
    *   **Filepath:** `src/index.ts`
    *   **Implementation:**
        ```typescript
        {
          name: 'get_card_comments',
          description: 'Get all comments for a Trello card, in chronological order.',
          input_schema: {
            type: 'object',
            properties: {
              card_id: { type: 'string', description: 'The ID of the Trello card.' },
            },
            required: ['card_id'],
          },
          function: async ({ card_id }: { card_id: string }) => {
            try {
              const comments = await trelloClient.getCardComments(card_id);
              if (comments.length === 0) {
                return 'No comments found on this card.';
              }
              return comments.map((comment: any) => ({
                comment_id: comment.id,
                author: comment.memberCreator.fullName,
                text: comment.data.text,
                date: comment.date,
              }));
            } catch (error) {
              return { error: error.message };
            }
          },
        },
        ```

7.  **Run Final Tests:**
    *   **Action:** Execute the full test suite.
    *   **Expected Result:** All tests, including the new tool test, should pass.
