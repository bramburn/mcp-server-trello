### Implementation Guidance: Sprint 3 - Implement Description Append Tool

This guide provides the technical details for creating the `append_to_card_description` tool.

#### 1. Trello API Reference

This tool uses two Trello API endpoints:

1.  **`GET /1/cards/{id}`** to fetch the current description.
    -   **Official Documentation**: [Trello API Documentation: Get Card](https://developer.atlassian.com/cloud/trello/rest/api-group-cards/#api-cards-id-get)
    -   **Key Parameter**: `fields=desc` to limit the response to just the description.
2.  **`PUT /1/cards/{id}`** to update the card with the new, appended description.
    -   **Official Documentation**: [Trello API Documentation: Update Card](https://developer.atlassian.com/cloud/trello/rest/api-group-cards/#api-cards-id-put)

**Workflow:**
1.  GET the card's `desc`.
2.  Append the new text to the existing `desc` in the application logic.
3.  PUT the full, modified `desc` back to the card.

#### 2. Code Implementation Details

**File: `src/validators.ts`**

Create a `zod` schema for the new tool's parameters.

```typescript
// src/validators.ts

import { z } from 'zod';

// ... other validators

export const appendToCardDescriptionRequestSchema = z.object({
  card_id: z.string(),
  text_to_append: z.string(),
});

export const validateAppendToCardDescriptionRequest = (params: any) => {
  return appendToCardDescriptionRequestSchema.parse(params);
};
```

**File: `src/trello-client.ts`**

Two methods are needed: one to get the current description and another to orchestrate the append logic.

```typescript
// src/trello-client.ts

// ... other methods

  async getCardDescription(cardId: string): Promise<string> {
    try {
      const card = await this.get(`/cards/${cardId}?fields=desc`);
      return card.desc || '';
    } catch (error) {
      // Handle cases where the card might not be found
      console.error(`Error fetching description for card ${cardId}:`, error);
      return ''; // Return empty string to prevent failures on append
    }
  }

  async appendToCardDescription(cardId: string, textToAppend: string): Promise<any> {
    const currentDesc = await this.getCardDescription(cardId);
    // Append with two newlines for a clear separation
    const newDesc = currentDesc ? `${currentDesc}\n\n${textToAppend}` : textToAppend;
    // Reuse the existing update method
    return this.updateCardDescription(cardId, newDesc);
  }

  async updateCardDescription(cardId: string, description: string): Promise<any> {
    return this.put(`/cards/${cardId}`, { desc: description });
  }

// ...
```

**File: `src/index.ts`**

Add the new `append_to_card_description` tool definition.

```typescript
// src/index.ts
import {
  // ...
  validateAppendToCardDescriptionRequest,
} from './validators';

// ... in the tools array

{
  type: 'function',
  function: {
    name: 'append_to_card_description',
    description: 'Appends new text to an existing card description.',
    parameters: {
      type: 'object',
      properties: {
        card_id: {
          type: 'string',
          description: 'The ID of the card to append the description to.',
        },
        text_to_append: {
          type: 'string',
          description: 'The piece of text to add to the end of the description.',
        },
      },
      required: ['card_id', 'text_to_append'],
    },
    handler: async (params: any) => {
      try {
        const { card_id, text_to_append } = validateAppendToCardDescriptionRequest(params);
        await trelloClient.appendToCardDescription(card_id, text_to_append);
        return { success: true, message: `Text appended to card ${card_id}.` };
      } catch (error) {
        // ... error handling
      }
    },
  },
}
This completes the implementation for Sprint 3.

```