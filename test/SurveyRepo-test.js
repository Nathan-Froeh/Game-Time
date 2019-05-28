import chai from 'chai';
const expect = chai.expect;
import SurveyRepo from '../src/SurveyRepo.js'
import Data from '../Data/Data.js'

describe('SurveyRepo', function() {
  let surveyRepo;
  beforeEach(() => {
    surveyRepo = new SurveyRepo(Data);
  });

  it('should be a function', function() {
    expect(SurveyRepo).to.be.a('function');
  });

  it('should be an instance of SurveyRepo', function() {
  	expect(surveyRepo).to.be.an.instanceof(SurveyRepo);
  });

  it('should accept a file path accessing survey data', function() {
  	expect(surveyRepo.surveys).to.be.an('array')
  });


});
