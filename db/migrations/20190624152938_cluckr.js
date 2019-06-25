exports.up = knex => {
    return knex.schema.createTable("clucks", t => {
        t.bigIncrements("id").primary();
        t.string("username");
        t.text("content");
        t.text("image_url");
        t.timestamp("createdAt").defaultTo(knex.fn.now());
        t.timestamp("updatedAt").defaultTo(knex.fn.now());
        
      });
};

exports.down = knex => {
  return knex.schema.dropTable('clucks');
};
