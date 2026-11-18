import { describe, it, expect } from 'vitest';
import { preparePlaintext } from '../crypto/plaintextPreparation';

describe('Plaintext Preparation & Digraph Formation', () => {
  it('correctly prepares BALLOON into BA LX LO ON', () => {
    const result = preparePlaintext('BALLOON');
    expect(result.digraphs).toEqual(['BA', 'LX', 'LO', 'ON']);
    expect(result.preparedText).toBe('BALXLOON');
    expect(result.fillerCount).toBe(1);
    expect(result.steps[1].fillerInserted).toBe(true);
    expect(result.steps[1].char2).toBe('X');
    expect(result.steps[1].reason).toBe('duplicate_filler');
  });

  it('correctly prepares HELLO into HE LX LO', () => {
    const result = preparePlaintext('HELLO');
    expect(result.digraphs).toEqual(['HE', 'LX', 'LO']);
    expect(result.preparedText).toBe('HELXLO');
    expect(result.fillerCount).toBe(1);
  });

  it('correctly pads odd-length word INSTRUMENTS into IN ST RU ME NT SX', () => {
    const result = preparePlaintext('INSTRUMENTS');
    expect(result.digraphs).toEqual(['IN', 'ST', 'RU', 'ME', 'NT', 'SX']);
    expect(result.preparedText).toBe('INSTRUMENTSX');
    expect(result.fillerCount).toBe(1);
    expect(result.steps[5].reason).toBe('odd_length_padding');
  });

  it('uses fallback filler Q when adjacent letter is X', () => {
    const result = preparePlaintext('FOXXES');
    // FO, XQ, XE, S...
    expect(result.digraphs[1]).toBe('XQ');
  });

  it('converts J to I in plaintext', () => {
    const result = preparePlaintext('JUSTICE');
    expect(result.replacedJCount).toBe(1);
    expect(result.digraphs[0]).toBe('IU');
  });

  it('ignores punctuation, numbers and spaces', () => {
    const result = preparePlaintext('Attack at 06:00 AM!');
    expect(result.normalizedText).toBe('ATTACKATAM');
  });
});
