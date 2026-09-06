import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePageSelection, parseBaseInteger, readList, writePreference, generatePassword } from '../lib/tool-utils.ts';

test('PDF selections preserve ordering without duplicate pages', () => {
  assert.deepEqual(parsePageSelection('5, 1-3, 2', 5), [4, 0, 1, 2]);
});
test('PDF selection rejects invalid and unbounded ranges before iterating', () => {
  for (const value of ['', '0', '-1', '1.5', '1-6', '3-1', '1-2-3', '1,,2', '1-999999999999999999']) {
    assert.throws(() => parsePageSelection(value, 5), undefined, value);
  }
});
test('base conversion handles zero, signs and integers beyond Number precision', () => {
  assert.equal(parseBaseInteger('0', 10), 0n);
  assert.equal(parseBaseInteger('-FF', 16), -255n);
  assert.equal(parseBaseInteger('+101', 2), 5n);
  assert.equal(parseBaseInteger('9007199254740993', 10), 9007199254740993n);
  for (const value of ['', '12', '0b1', '1.1']) assert.equal(parseBaseInteger(value, 2), null);
});
test('corrupt or blocked browser storage does not crash the workspace', () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  try {
    for (const value of ['{}', 'null', 'broken', '42']) {
      Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: () => value } });
      assert.deepEqual(readList('recent'), []);
    }
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: () => '["pdf",1,"pdf","json"]' } });
    assert.deepEqual(readList('recent'), ['pdf', 'json']);
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, get: () => { throw new Error('Storage denied'); } });
    assert.deepEqual(readList('recent'), []);
    assert.doesNotThrow(() => writePreference('theme', 'dark'));
  } finally {
    if (original) Object.defineProperty(globalThis, 'localStorage', original);
    else delete globalThis.localStorage;
  }
});
test('generated passwords include every selected group at minimum length', () => {
  const groups = ['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0123456789', '!@#$%^&*_-+='];
  for (let i = 0; i < 100; i++) {
    const password = generatePassword(8, groups);
    assert.equal(password.length, 8);
    for (const group of groups) assert.ok([...password].some(char => group.includes(char)));
  }
});
