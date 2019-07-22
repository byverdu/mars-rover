import utils from '../src/utils';

describe('Utils', () => {
  describe('convertSourceInToCoords', () => {
    it('should be defined', () => {
      expect(utils.convertSourceInToCoords).toBeDefined();
    });

    it('should be called with 2 string parameters', () => {
      const spy = jest.spyOn(utils, 'convertSourceInToCoords');
      utils.convertSourceInToCoords('0 0 N', 'RM');
      expect(spy).toHaveBeenCalledWith('0 0 N', 'RM');
    });

    it('should convert the source into steps, case: L', () => {
      const result = utils.convertSourceInToCoords('0 0 N', 'L');
      expect(result).toEqual(['0 0 W']);
    });

    it('should convert the source into steps, case: LL', () => {
      const result = utils.convertSourceInToCoords('0 0 N', 'LL');
      expect(result).toEqual(['0 0 W', '0 0 S']);
    });

    it('should convert the source into steps, case: LLL', () => {
      const result = utils.convertSourceInToCoords('0 0 N', 'LLL');
      expect(result).toEqual(['0 0 W', '0 0 S', '0 0 E']);
    });

    it('should convert the source into steps, case: R', () => {
      const result = utils.convertSourceInToCoords('0 0 N', 'R');
      expect(result).toEqual(['0 0 E']);
    });

    it('should convert the source into steps, case: RR', () => {
      const result = utils.convertSourceInToCoords('0 0 N', 'RR');
      expect(result).toEqual(['0 0 E', '0 0 S']);
    });

    it('should convert the source into steps, case: RRR', () => {
      const result = utils.convertSourceInToCoords('0 0 N', 'RRR');
      expect(result).toEqual(['0 0 E', '0 0 S', '0 0 W']);
    });

    it('should convert the source into steps, case: RRL', () => {
      const result = utils.convertSourceInToCoords('0 0 N', 'RRL');
      expect(result).toEqual(['0 0 E', '0 0 S', '0 0 E']);
    });

    it('should convert the source into steps, case: RM', () => {
      const result = utils.convertSourceInToCoords('0 0 N', 'RM');
      expect(result).toEqual(['0 0 E', '1 0 E']);
    });

    it('should convert the source into steps, case: MMR', () => {
      const result = utils.convertSourceInToCoords('0 0 N', 'MMR');
      expect(result).toEqual(['0 1 N', '0 2 N', '0 2 E']);
    });

    it('should convert the source into steps, case: MRMMR', () => {
      const result = utils.convertSourceInToCoords('2 2 E', 'MRMMR');
      expect(result).toEqual(['3 2 E', '3 2 S', '3 1 S', '3 0 S', '3 0 W']);
    });

    it('should convert the source into steps, case: MLLM', () => {
      const result = utils.convertSourceInToCoords('0 3 S', 'MLLM');
      expect(result).toEqual(['0 2 S', '0 2 E', '0 2 N', '0 3 N']);
    });
  });
});