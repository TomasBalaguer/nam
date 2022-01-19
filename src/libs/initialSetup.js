import Role from "./../models/Role";
import Group from "./../models/Group";

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "admin" }).save(),
      new Role({ name: "trainer" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.log(error);
  }
};

export const createGroups = async () => {
  try {
    const count = await Group.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Group({ name: "ps" }).save(),
      new Group({ name: "primera" }).save(),
      new Group({ name: "intermedia" }).save(),
      new Group({ name: "preA" }).save(),
      new Group({ name: "preB" }).save(),
      new Group({ name: "preC" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.log(error);
  }
};
