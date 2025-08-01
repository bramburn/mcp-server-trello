#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { TrelloClient } from './trello-client.js';
import {
  validateGetCardsListRequest,
  validateGetRecentActivityRequest,
  validateAddCardRequest,
  validateUpdateCardRequest,
  validateArchiveCardRequest,
  validateAddListRequest,
  validateArchiveListRequest,
  validateMoveCardRequest,
  validateAttachImageRequest,
  validateGetListsRequest,
  validateSetActiveBoardRequest,
  validateSetActiveWorkspaceRequest,
  validateListBoardsInWorkspaceRequest,
  validateUpdateCardDescriptionRequest,
  validateAppendToCardDescriptionRequest,
  validateGetCardLabelsRequest,
  validateAddLabelsToCardRequest,
} from './validators.js';

class TrelloServer {
  private server: Server;
  private trelloClient: TrelloClient;

  constructor() {
    const apiKey = process.env.TRELLO_API_KEY;
    const token = process.env.TRELLO_TOKEN;
    const defaultBoardId = process.env.TRELLO_BOARD_ID;

    if (!apiKey || !token) {
      throw new Error('TRELLO_API_KEY and TRELLO_TOKEN environment variables are required');
    }

    this.trelloClient = new TrelloClient({
      apiKey,
      token,
      defaultBoardId,
      boardId: defaultBoardId, // Use defaultBoardId as initial boardId if provided
    });

    this.server = new Server(
      {
        name: 'trello-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();

    // Error handling
    this.server.onerror = error => {
      // Silently handle errors to avoid interfering with MCP protocol
    };
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'get_cards_by_list_id',
          description: 'Fetch cards from a specific Trello list on a specific board',
          inputSchema: {
            type: 'object',
            properties: {
              boardId: {
                type: 'string',
                description: 'ID of the Trello board (uses default if not provided)',
              },
              listId: {
                type: 'string',
                description: 'ID of the Trello list',
              },
            },
            required: ['listId'],
          },
        },
        {
          name: 'get_lists',
          description: 'Retrieve all lists from the specified board',
          inputSchema: {
            type: 'object',
            properties: {
              boardId: {
                type: 'string',
                description: 'ID of the Trello board (uses default if not provided)',
              },
            },
            required: [],
          },
        },
        {
          name: 'get_recent_activity',
          description: 'Fetch recent activity on the Trello board',
          inputSchema: {
            type: 'object',
            properties: {
              boardId: {
                type: 'string',
                description: 'ID of the Trello board (uses default if not provided)',
              },
              limit: {
                type: 'number',
                description: 'Number of activities to fetch (default: 10)',
              },
            },
            required: [],
          },
        },
        {
          name: 'add_card_to_list',
          description: 'Add a new card to a specified list on a specific board',
          inputSchema: {
            type: 'object',
            properties: {
              boardId: {
                type: 'string',
                description: 'ID of the Trello board (uses default if not provided)',
              },
              listId: {
                type: 'string',
                description: 'ID of the list to add the card to',
              },
              name: {
                type: 'string',
                description: 'Name of the card',
              },
              description: {
                type: 'string',
                description: 'Description of the card',
              },
              dueDate: {
                type: 'string',
                description: 'Due date for the card (ISO 8601 format)',
              },
              labels: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description: 'Array of label IDs to apply to the card',
              },
            },
            required: ['listId', 'name'],
          },
        },
        {
          name: 'update_card_details',
          description: "Update an existing card's details on a specific board",
          inputSchema: {
            type: 'object',
            properties: {
              boardId: {
                type: 'string',
                description: 'ID of the Trello board (uses default if not provided)',
              },
              cardId: {
                type: 'string',
                description: 'ID of the card to update',
              },
              name: {
                type: 'string',
                description: 'New name for the card',
              },
              description: {
                type: 'string',
                description: 'New description for the card',
              },
              dueDate: {
                type: 'string',
                description: 'New due date for the card (ISO 8601 format)',
              },
              labels: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description: 'New array of label IDs for the card',
              },
            },
            required: ['cardId'],
          },
        },
        {
          name: 'update_card_description',
          description: 'Update the entire description of a specific card',
          inputSchema: {
            type: 'object',
            properties: {
              card_id: {
                type: 'string',
                description: 'The ID of the card to update',
              },
              description: {
                type: 'string',
                description: 'The new, complete description for the card',
              },
            },
            required: ['card_id', 'description'],
          },
        },
        {
          name: 'append_to_card_description',
          description: 'Append text to the existing description of a specific card',
          inputSchema: {
            type: 'object',
            properties: {
              card_id: {
                type: 'string',
                description: 'The ID of the card to append text to',
              },
              text_to_append: {
                type: 'string',
                description: 'The text to append to the card description',
              },
            },
            required: ['card_id', 'text_to_append'],
          },
        },
        {
          name: 'archive_card',
          description: 'Send a card to the archive on a specific board',
          inputSchema: {
            type: 'object',
            properties: {
              boardId: {
                type: 'string',
                description: 'ID of the Trello board (uses default if not provided)',
              },
              cardId: {
                type: 'string',
                description: 'ID of the card to archive',
              },
            },
            required: ['cardId'],
          },
        },
        {
          name: 'move_card',
          description: 'Move a card to a different list, potentially on a different board',
          inputSchema: {
            type: 'object',
            properties: {
              boardId: {
                type: 'string',
                description:
                  'ID of the target Trello board (where the listId resides, uses default if not provided)',
              },
              cardId: {
                type: 'string',
                description: 'ID of the card to move',
              },
              listId: {
                type: 'string',
                description: 'ID of the target list',
              },
            },
            required: ['cardId', 'listId'],
          },
        },
        {
          name: 'add_list_to_board',
          description: 'Add a new list to the specified board',
          inputSchema: {
            type: 'object',
            properties: {
              boardId: {
                type: 'string',
                description: 'ID of the Trello board (uses default if not provided)',
              },
              name: {
                type: 'string',
                description: 'Name of the new list',
              },
            },
            required: ['name'],
          },
        },
        {
          name: 'archive_list',
          description: 'Send a list to the archive on a specific board',
          inputSchema: {
            type: 'object',
            properties: {
              boardId: {
                type: 'string',
                description: 'ID of the Trello board (uses default if not provided)',
              },
              listId: {
                type: 'string',
                description: 'ID of the list to archive',
              },
            },
            required: ['listId'],
          },
        },
        {
          name: 'get_my_cards',
          description: 'Fetch all cards assigned to the current user',
          inputSchema: {
            type: 'object',
            properties: {},
            required: [],
          },
        },
        {
          name: 'attach_image_to_card',
          description: 'Attach an image to a card from a URL on a specific board',
          inputSchema: {
            type: 'object',
            properties: {
              boardId: {
                type: 'string',
                description:
                  'ID of the Trello board where the card exists (uses default if not provided)',
              },
              cardId: {
                type: 'string',
                description: 'ID of the card to attach the image to',
              },
              imageUrl: {
                type: 'string',
                description: 'URL of the image to attach',
              },
              name: {
                type: 'string',
                description: 'Optional name for the attachment (defaults to "Image Attachment")',
              },
            },
            required: ['cardId', 'imageUrl'],
          },
        },
        {
          name: 'list_boards',
          description: 'List all boards the user has access to',
          inputSchema: {
            type: 'object',
            properties: {},
            required: [],
          },
        },
        {
          name: 'set_active_board',
          description: 'Set the active board for future operations',
          inputSchema: {
            type: 'object',
            properties: {
              boardId: {
                type: 'string',
                description: 'ID of the board to set as active',
              },
            },
            required: ['boardId'],
          },
        },
        {
          name: 'list_workspaces',
          description: 'List all workspaces the user has access to',
          inputSchema: {
            type: 'object',
            properties: {},
            required: [],
          },
        },
        {
          name: 'set_active_workspace',
          description: 'Set the active workspace for future operations',
          inputSchema: {
            type: 'object',
            properties: {
              workspaceId: {
                type: 'string',
                description: 'ID of the workspace to set as active',
              },
            },
            required: ['workspaceId'],
          },
        },
        {
          name: 'list_boards_in_workspace',
          description: 'List all boards in a specific workspace',
          inputSchema: {
            type: 'object',
            properties: {
              workspaceId: {
                type: 'string',
                description: 'ID of the workspace to list boards from',
              },
            },
            required: ['workspaceId'],
          },
        },
        {
          name: 'get_active_board_info',
          description: 'Get information about the currently active board',
          inputSchema: {
            type: 'object',
            properties: {},
            required: [],
          },
        },
        {
          name: 'get_board_labels',
          description: 'Get all available labels for the currently active board',
          inputSchema: {
            type: 'object',
            properties: {},
            required: [],
          },
        },
        {
          name: 'get_card_labels',
          description: 'Get all labels currently applied to a specific card',
          inputSchema: {
            type: 'object',
            properties: {
              card_id: {
                type: 'string',
                description: 'The ID of the card to get labels from',
              },
            },
            required: ['card_id'],
          },
        },
        {
          name: 'add_labels_to_card',
          description: 'Add one or more existing labels to a specific card',
          inputSchema: {
            type: 'object',
            properties: {
              card_id: {
                type: 'string',
                description: 'The ID of the card to add labels to',
              },
              label_ids: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description: 'An array of label IDs to add to the card',
              },
            },
            required: ['card_id', 'label_ids'],
          },
        },
        {
          name: 'get_card_comments',
          description: 'Get all comments for a Trello card, in chronological order',
          inputSchema: {
            type: 'object',
            properties: {
              card_id: {
                type: 'string',
                description: 'The ID of the Trello card',
              },
            },
            required: ['card_id'],
          },
        },
        {
          name: 'add_comment_to_card',
          description: 'Add a new comment to a Trello card',
          inputSchema: {
            type: 'object',
            properties: {
              card_id: {
                type: 'string',
                description: 'The ID of the Trello card',
              },
              comment_text: {
                type: 'string',
                description: 'The text of the comment to add',
              },
            },
            required: ['card_id', 'comment_text'],
          },
        },
        {
          name: 'edit_card_comment',
          description: 'Edit an existing comment on a Trello card (only your own comments)',
          inputSchema: {
            type: 'object',
            properties: {
              card_id: {
                type: 'string',
                description: 'The ID of the Trello card',
              },
              comment_id: {
                type: 'string',
                description: 'The ID of the comment to edit',
              },
              comment_text: {
                type: 'string',
                description: 'The new text for the comment',
              },
            },
            required: ['card_id', 'comment_id', 'comment_text'],
          },
        },
        {
          name: 'delete_card_comment',
          description: 'Delete an existing comment on a Trello card (only your own comments)',
          inputSchema: {
            type: 'object',
            properties: {
              card_id: {
                type: 'string',
                description: 'The ID of the Trello card',
              },
              comment_id: {
                type: 'string',
                description: 'The ID of the comment to delete',
              },
            },
            required: ['card_id', 'comment_id'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async request => {
      try {
        if (!request.params.arguments) {
          throw new McpError(ErrorCode.InvalidParams, 'Missing arguments');
        }

        const args = request.params.arguments as Record<string, unknown>;

        switch (request.params.name) {
          case 'get_cards_by_list_id': {
            const validArgs = validateGetCardsListRequest(args);
            const cards = await this.trelloClient.getCardsByList(
              validArgs.boardId,
              validArgs.listId
            );
            return {
              content: [{ type: 'text', text: JSON.stringify(cards, null, 2) }],
            };
          }

          case 'list_boards': {
            const boards = await this.trelloClient.listBoards();
            return {
              content: [{ type: 'text', text: JSON.stringify(boards, null, 2) }],
            };
          }

          case 'get_lists': {
            const validArgs = validateGetListsRequest(args);
            const lists = await this.trelloClient.getLists(validArgs.boardId);
            return {
              content: [{ type: 'text', text: JSON.stringify(lists, null, 2) }],
            };
          }

          case 'get_recent_activity': {
            const validArgs = validateGetRecentActivityRequest(args);
            const activity = await this.trelloClient.getRecentActivity(
              validArgs.boardId,
              validArgs.limit
            );
            return {
              content: [{ type: 'text', text: JSON.stringify(activity, null, 2) }],
            };
          }

          case 'add_card_to_list': {
            const validArgs = validateAddCardRequest(args);
            const card = await this.trelloClient.addCard(validArgs.boardId, validArgs);
            return {
              content: [{ type: 'text', text: JSON.stringify(card, null, 2) }],
            };
          }

          case 'update_card_details': {
            const validArgs = validateUpdateCardRequest(args);
            const card = await this.trelloClient.updateCard(validArgs.boardId, validArgs);
            return {
              content: [{ type: 'text', text: JSON.stringify(card, null, 2) }],
            };
          }

          case 'update_card_description': {
            const validArgs = validateUpdateCardDescriptionRequest(args);
            const card = await this.trelloClient.updateCardDescription(validArgs.card_id, validArgs.description);
            return {
              content: [{
                type: 'text',
                text: JSON.stringify({
                  success: true,
                  message: `Description for card ${validArgs.card_id} updated successfully.`,
                  card: card
                }, null, 2)
              }],
            };
          }

          case 'append_to_card_description': {
            const validArgs = validateAppendToCardDescriptionRequest(args);
            const card = await this.trelloClient.appendToCardDescription(validArgs.card_id, validArgs.text_to_append);
            return {
              content: [{
                type: 'text',
                text: JSON.stringify({
                  success: true,
                  message: `Text appended to card ${validArgs.card_id} successfully.`,
                  card: card
                }, null, 2)
              }],
            };
          }

          case 'archive_card': {
            const validArgs = validateArchiveCardRequest(args);
            const card = await this.trelloClient.archiveCard(validArgs.boardId, validArgs.cardId);
            return {
              content: [{ type: 'text', text: JSON.stringify(card, null, 2) }],
            };
          }

          case 'move_card': {
            const validArgs = validateMoveCardRequest(args);
            const card = await this.trelloClient.moveCard(
              validArgs.boardId,
              validArgs.cardId,
              validArgs.listId
            );
            return {
              content: [{ type: 'text', text: JSON.stringify(card, null, 2) }],
            };
          }

          case 'add_list_to_board': {
            const validArgs = validateAddListRequest(args);
            const list = await this.trelloClient.addList(validArgs.boardId, validArgs.name);
            return {
              content: [{ type: 'text', text: JSON.stringify(list, null, 2) }],
            };
          }

          case 'archive_list': {
            const validArgs = validateArchiveListRequest(args);
            const list = await this.trelloClient.archiveList(validArgs.boardId, validArgs.listId);
            return {
              content: [{ type: 'text', text: JSON.stringify(list, null, 2) }],
            };
          }

          case 'get_my_cards': {
            const cards = await this.trelloClient.getMyCards();
            return {
              content: [{ type: 'text', text: JSON.stringify(cards, null, 2) }],
            };
          }

          case 'attach_image_to_card': {
            const validArgs = validateAttachImageRequest(args);
            try {
              const attachment = await this.trelloClient.attachImageToCard(
                validArgs.boardId,
                validArgs.cardId,
                validArgs.imageUrl,
                validArgs.name
              );
              return {
                content: [{ type: 'text', text: JSON.stringify(attachment, null, 2) }],
              };
            } catch (error) {
              return this.handleErrorResponse(error);
            }
          }

          case 'set_active_board': {
            const validArgs = validateSetActiveBoardRequest(args);
            try {
              const board = await this.trelloClient.setActiveBoard(validArgs.boardId);
              return {
                content: [
                  {
                    type: 'text',
                    text: `Successfully set active board to "${board.name}" (${board.id})`,
                  },
                ],
              };
            } catch (error) {
              return this.handleErrorResponse(error);
            }
          }

          case 'list_workspaces': {
            const workspaces = await this.trelloClient.listWorkspaces();
            return {
              content: [{ type: 'text', text: JSON.stringify(workspaces, null, 2) }],
            };
          }

          case 'set_active_workspace': {
            const validArgs = validateSetActiveWorkspaceRequest(args);
            try {
              const workspace = await this.trelloClient.setActiveWorkspace(validArgs.workspaceId);
              return {
                content: [
                  {
                    type: 'text',
                    text: `Successfully set active workspace to "${workspace.displayName}" (${workspace.id})`,
                  },
                ],
              };
            } catch (error) {
              return this.handleErrorResponse(error);
            }
          }

          case 'list_boards_in_workspace': {
            const validArgs = validateListBoardsInWorkspaceRequest(args);
            try {
              const boards = await this.trelloClient.listBoardsInWorkspace(validArgs.workspaceId);
              return {
                content: [{ type: 'text', text: JSON.stringify(boards, null, 2) }],
              };
            } catch (error) {
              return this.handleErrorResponse(error);
            }
          }

          case 'get_active_board_info': {
            try {
              const boardId = this.trelloClient.activeBoardId;
              if (!boardId) {
                throw new McpError(ErrorCode.InvalidParams, 'No active board set');
              }
              const board = await this.trelloClient.getBoardById(boardId);
              return {
                content: [
                  {
                    type: 'text',
                    text: JSON.stringify(
                      {
                        ...board,
                        isActive: true,
                        activeWorkspaceId: this.trelloClient.activeWorkspaceId || 'Not set',
                      },
                      null,
                      2
                    ),
                  },
                ],
              };
            } catch (error) {
              return this.handleErrorResponse(error);
            }
          }

          case 'get_board_labels': {
            try {
              const labels = await this.trelloClient.getBoardLabels();
              return {
                content: [{
                  type: 'text',
                  text: JSON.stringify({
                    success: true,
                    labels: labels.map(label => ({
                      id: label.id,
                      name: label.name,
                      color: label.color
                    }))
                  }, null, 2)
                }],
              };
            } catch (error) {
              return this.handleErrorResponse(error);
            }
          }

          case 'get_card_labels': {
            try {
              const validArgs = validateGetCardLabelsRequest(args);
              const labels = await this.trelloClient.getCardLabels(validArgs.card_id);
              return {
                content: [{
                  type: 'text',
                  text: JSON.stringify({
                    success: true,
                    labels: labels.map(label => ({
                      id: label.id,
                      name: label.name,
                      color: label.color
                    }))
                  }, null, 2)
                }],
              };
            } catch (error) {
              return this.handleErrorResponse(error);
            }
          }

          case 'add_labels_to_card': {
            try {
              const validArgs = validateAddLabelsToCardRequest(args);
              const card = await this.trelloClient.addLabelsToCard(validArgs.card_id, validArgs.label_ids);
              return {
                content: [{
                  type: 'text',
                  text: JSON.stringify({
                    success: true,
                    message: `Labels added to card ${validArgs.card_id} successfully.`,
                    card: card
                  }, null, 2)
                }],
              };
            } catch (error) {
              return this.handleErrorResponse(error);
            }
          }

          case 'get_card_comments': {
            try {
              const { card_id } = args as { card_id: string };
              if (!card_id) {
                throw new McpError(ErrorCode.InvalidParams, 'card_id is required');
              }
              const comments = await this.trelloClient.getCardComments(card_id);
              if (comments.length === 0) {
                return {
                  content: [{ type: 'text', text: 'No comments found on this card.' }],
                };
              }
              const formattedComments = comments.map((comment: any) => ({
                comment_id: comment.id,
                author: comment.memberCreator.fullName,
                text: comment.data.text,
                date: comment.date,
              }));
              return {
                content: [{ type: 'text', text: JSON.stringify(formattedComments, null, 2) }],
              };
            } catch (error) {
              return this.handleErrorResponse(error);
            }
          }

          case 'add_comment_to_card': {
            try {
              const { card_id, comment_text } = args as { card_id: string; comment_text: string };
              if (!card_id) {
                throw new McpError(ErrorCode.InvalidParams, 'card_id is required');
              }
              if (!comment_text) {
                throw new McpError(ErrorCode.InvalidParams, 'comment_text is required');
              }
              const result = await this.trelloClient.addCommentToCard(card_id, comment_text);
              return {
                content: [
                  {
                    type: 'text',
                    text: JSON.stringify(
                      {
                        success: true,
                        comment_id: result.id,
                        message: 'Comment added successfully',
                      },
                      null,
                      2
                    ),
                  },
                ],
              };
            } catch (error) {
              return this.handleErrorResponse(error);
            }
          }

          case 'edit_card_comment': {
            try {
              const { card_id, comment_id, comment_text } = args as {
                card_id: string;
                comment_id: string;
                comment_text: string;
              };
              if (!card_id) {
                throw new McpError(ErrorCode.InvalidParams, 'card_id is required');
              }
              if (!comment_id) {
                throw new McpError(ErrorCode.InvalidParams, 'comment_id is required');
              }
              if (!comment_text) {
                throw new McpError(ErrorCode.InvalidParams, 'comment_text is required');
              }
              const result = await this.trelloClient.editCardComment(
                card_id,
                comment_id,
                comment_text
              );
              return {
                content: [
                  {
                    type: 'text',
                    text: JSON.stringify(
                      {
                        success: true,
                        comment_id: result.id,
                        message: 'Comment edited successfully',
                      },
                      null,
                      2
                    ),
                  },
                ],
              };
            } catch (error) {
              return this.handleErrorResponse(error);
            }
          }

          case 'delete_card_comment': {
            try {
              const { card_id, comment_id } = args as {
                card_id: string;
                comment_id: string;
              };
              if (!card_id) {
                throw new McpError(ErrorCode.InvalidParams, 'card_id is required');
              }
              if (!comment_id) {
                throw new McpError(ErrorCode.InvalidParams, 'comment_id is required');
              }
              await this.trelloClient.deleteCardComment(card_id, comment_id);
              return {
                content: [
                  {
                    type: 'text',
                    text: JSON.stringify(
                      {
                        success: true,
                        message: 'Comment deleted successfully',
                      },
                      null,
                      2
                    ),
                  },
                ],
              };
            } catch (error) {
              return this.handleErrorResponse(error);
            }
          }

          default:
            throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: error instanceof Error ? error.message : 'Unknown error occurred',
            },
          ],
          isError: true,
        };
      }
    });
  }

  private handleErrorResponse(error: unknown) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        },
      ],
      isError: true,
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    // Load configuration before starting the server
    await this.trelloClient.loadConfig().catch(error => {
      // Continue with default config if loading fails
    });
    await this.server.connect(transport);
  }
}

const server = new TrelloServer();
server.run().catch(() => {
  // Silently handle errors to avoid interfering with MCP protocol
});
