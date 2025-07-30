### Implementation Guidance: Sprint 2 - Implement Description Update Tool

This guide provides the technical details for creating the `update_card_description` tool.

#### 1. Trello API Reference

The endpoint for updating a card is `PUT /1/cards/{id}`.

-   **Endpoint**: `PUT /1/cards/{id}`
-   **Official Documentation**: [Trello API Documentation: Update Card](https://developer.atlassian.com/cloud/trello/rest/api-group-cards/#api-cards-id-put)

**Key Parameters:**
-   `id` (required, in path): The ID of the card to update.
-   `desc` (optional, in body): The new description for the card.

**Example Request:**
```bash
curl --request PUT \
  --url 'https://api.trello.com/1/cards/CARD_ID?desc=New+updated+description.&key=API_KEY&token=API_TOKEN' \
  --header 'Accept: application/json'
```

#### 2. Code Implementation Details

The implementation involves `src/validators.ts`, `src/trello-client.ts`, and `src/index.ts`.

**File: `src/validators.ts`**

Add a new `zod` schema for the `update_card_description` request.

```typescript
// src/validators.ts

import { z } from 'zod';

// ... other validators

export const updateCardDescriptionRequestSchema = z.object({
  card_id: z.string(),
  description: z.string(),
});

export const validateUpdateCardDescriptionRequest = (params: any) => {
  return updateCardDescriptionRequestSchema.parse(params);
};
```

**File: `src/trello-client.ts`**

Add a new method to the `TrelloClient` to handle the API call.

```typescript
// src/trello-client.ts

// ... other methods

  async updateCardDescription(cardId: string, description: string): Promise<any> {
    return this.put(`/cards/${cardId}`, { desc: description });
  }

// ...
```

**File: `src/index.ts`**

Add the new tool to the tools array.

```typescript
// src/index.ts
import {
  // ...
  validateUpdateCardDescriptionRequest,
} from './validators';

// ... in the tools array

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
          description: 'The new, complete description for the card.',
        },
      },
      required: ['card_id', 'description'],
    },
    handler: async (params: any) => {
      try {
        const { card_id, description } = validateUpdateCardDescriptionRequest(params);
        await trelloClient.updateCardDescription(card_id, description);
        return { success: true, message: `Description for card ${card_id} updated.` };
      } catch (error) {
        // ... error handling
      }
    },
  },
}
```
This completes the implementation for Sprint 2.