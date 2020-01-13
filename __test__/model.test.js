'use strict';

require('@code-fellows/supergoose');

const Product = require('../models/productModel');


const productModel = new Product();


describe('Model CRUD methods', () => {
  it('productModel can create() a record', async () => {
    const obj = { name: 'Food', amount: 40 };
    const createdObj = await productModel.create(obj);
    Object.keys(obj).forEach(key => {
      expect(createdObj[key]).toEqual(obj[key]);
    });
  });

  it('productModel can get() a record', async () => {
    const obj = { name: 'Food', amount: 40 };
    const createdObj = await productModel.create(obj);
    const fetchObj = await productModel.get(createdObj._id);
    expect(fetchObj._id).toEqual(createdObj._id);
  });

  it('productModel can update() a record', async () => {
    const obj = { name: 'Food', amount: 40 };
    const update = { name: 'Not food' };
    const createdObj = await productModel.create(obj);
    const updateObj = await productModel.update(createdObj._id, update);
    Object.keys(update).forEach(key => {
      expect(updateObj[key]).not.toEqual(obj[key]);
    });
  });

  it('update() returns undefined when missing required parameters', async () => {
    const obj = { name: 'Test', amount: 0 };
    await productModel.create(obj);
    expect(productModel.update()).toBeUndefined();
  });

  it('productModel can delete() a record', async () => {
    const obj = { name: 'to delete', amount: 2 };
    let createdObj = await productModel.create(obj);
    await productModel.delete(createdObj._id);
    let fetchObj = await productModel.get(createdObj._id);
    expect(fetchObj).toBeNull();
  });

  it('delete() returns undefined id when id does not match', async () => {
    let obj = { name: 'Delete Me', amount: 34 };
    await productModel.create(obj);
    expect(productModel.delete()).toEqual('No record found');
  });
});