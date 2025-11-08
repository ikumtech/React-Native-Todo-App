import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const getTodos = query({
  handler: async (ctx) => {
    return await ctx.db.query('todos').order('asc').collect();
  },
});

export const createTodo = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()), 
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('todos', {
      title: args.title,
      description: args.description ?? '', 
      completed: false,
      createdAt: Date.now(),
      order: Date.now(),
    });
  },
});

export const toggleTodo = mutation({
  args: { id: v.id('todos'), completed: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { completed: args.completed });
  },
});

export const deleteTodo = mutation({
  args: { id: v.id('todos') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const reorderTodos = mutation({
  args: {
    orderedIds: v.array(v.id('todos')),
  },
  handler: async (ctx, args) => {
    for (let i = 0; i < args.orderedIds.length; i++) {
      await ctx.db.patch(args.orderedIds[i], {
        order: i,
      });
    }
  },
});



export const clearCompletedTodos = mutation({
  handler: async (ctx) => {
    const completed = await ctx.db
      .query('todos')
      .filter((q) => q.eq(q.field('completed'), true))
      .collect();

    for (let todo of completed) {
      await ctx.db.delete(todo._id);
    }
  },
});
