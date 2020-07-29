/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');


let CURR_STATE = true;
var token = 0;
var tutorial=0;

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = '';

    if (supportsAPL(handlerInput)) {
      token = 0;
      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./start.json'),
            datasources: {}
        })
        .getResponse();
    } else {
      return handlerInput.responseBuilder
        .speak("Sorry, this app is built for a multimodal experience only. Try this app again on an amazon device with a screen")
        .reprompt(speechText)
        .withSimpleCard('Try this on an amazon device with a screen', speechText)
        .getResponse();
    }
  },
};




const videndhandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
        && handlerInput.requestEnvelope.request.arguments.length > 0
        && handlerInput.requestEnvelope.request.arguments[0] === 'videoEnded')||
        (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'red');
  },
  handle(handlerInput) {
      return handlerInput.responseBuilder
        .addDirective({
              type: "Alexa.Presentation.APL.ExecuteCommands",
              token: "VideoPlayerToken",
              commands: [
                {
                  type: "ControlMedia",
                  componentId: "myVideoPlayer",
                  command: 'seek',
                  value:-2000
                }
              ]
          })
        .reprompt('')
        .getResponse();
    
  },
};

const tryagainHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
        && handlerInput.requestEnvelope.request.arguments.length > 0
        && handlerInput.requestEnvelope.request.arguments[0] === 'tryagain');
  },
  handle(handlerInput) {
      token = 0;
      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./tryagain.json'),
            datasources: {}
        })
        .speak('You have reached an ending, say try again to continue. Or Exit, to leave the skill')
        .reprompt('')
        .getResponse();

  },
};

const newgameHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'tryagain';
  },
  handle(handlerInput) {
      token = 0;
      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./adatewithmark.json'),
            datasources: {}
        })
        .getResponse();

  },
};





const payHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'pay';
  },
  handle(handlerInput) {
    if (token===0){
      token = 1;
      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./pay.json'),
            datasources: {}
        })
        .getResponse();
    }
    else{
    return handlerInput.responseBuilder
      .speak('What is your choice?')
      .reprompt('')
      .getResponse();
    }
    
  },
};





const dontpayHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'dontpay';
  },
  handle(handlerInput) {
    if (token===0){
      token = 2;
      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./dontpayk.json'),
            datasources: {}
        })
        .getResponse();
    }
    else {
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();
    }
  },
};


const romanceHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'romance';
  },
  handle(handlerInput) {
      if (token === 1){
      token = 3;
      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./Romance.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();   
      }
  },
};



const horrorHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'horror')||
      (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'watchplay')||
            (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'thedarkmark');
  },
  handle(handlerInput) {
      if (token===1 || token ===3){
      token = 4;

      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./Horror.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();
      }
  },
};





const freedomHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'freedom';
  },
  handle(handlerInput) {
      if (token===4){
      token=8;

      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./freedom.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
        return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();
      }
  },
};


const relaxHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'relax';
  },
  handle(handlerInput) {
      if (token===4){

      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./relax.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
        return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();
      }
      
      
  },
};

const dontblinkHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'dontblink';
  },
  handle(handlerInput) {
      if(token===4){

      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./dontblink.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();
      }
      
  },
};


const dontmoveHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'dontmove';
  },
  handle(handlerInput) {
      if(token===4){

      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./Dontmove.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();
      }
      
  },
};


const leaveHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'leave';
  },
  handle(handlerInput) {
      if(token===3){
      token=7;
      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./leave.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();
      }
      
  },
};





const noHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'no';
  },
  handle(handlerInput) {
      if (token===7){

      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./no.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();
      }
  },
};


const yesHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'yes';
  },
  handle(handlerInput) {
      if (token===7){

      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./yes.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();
      
      }
  },
};

const rightHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'right';
  },
  handle(handlerInput) {
      if (token===8){

      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./Right.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();
      }
      
  },
};


const leftHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'left';
  },
  handle(handlerInput) {
      if(token===8){

      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./left.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();
      }
      
  },
};
const attackHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'attack';
  },
  handle(handlerInput) {
      if(token===2){
      token=5;

      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./attack.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();
      }
      
  },
};


const dontattackHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'dontattack';
  },
  handle(handlerInput) {
      if (token===2){
      token=6;

      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./dontattack.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('What is your choice?')
        .getResponse();
      }
  },
};

const roadHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'road';
  },
  handle(handlerInput) {
      if (token===5){
      token=13;

      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./road.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();  
      }
      
  },
};


const shinyHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'shiny';
  },
  handle(handlerInput) {
      if (token===5){

      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./shiny.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();
      }
      
  },
};
const digHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'dig';
  },
  handle(handlerInput) {
      if (token===6){

      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./dig.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();
      }
      
  },
};


const picklockHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'pick';
  },
  handle(handlerInput) {
      if (token===6){
      token=16;

      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./picklock.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();
      }
      
  },
};

const splitupHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'splitup';
  },
  handle(handlerInput) {
      if (token===16){

      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./splitup.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();
      }
      
  },
};


const staytogetherHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'staytogether';
  },
  handle(handlerInput) {
      if (token===16){
      token=24;

      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./staytogether.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('What is your choice?')
        .getResponse();
      }
      
  },
};

const exitHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'exit';
  },
  handle(handlerInput) {
      if (token===24){
      token=6;

      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./exit.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();
      }
      
  },
};


const moreHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'more';
  },
  handle(handlerInput) {
      if (token===24){

      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./more.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();
      }
  },
};




const tunaHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'tuna';
  },
  handle(handlerInput) {
      if (token===13){

      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./tuna.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();
      }
      
  },
};


const pbnjHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'pbj';
  },
  handle(handlerInput) {
      if (token===13){

      return handlerInput.responseBuilder
        .speak('')
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: "VideoPlayerToken",
            document: require('./pbnj.json'),
            datasources: {}
        })
        .getResponse();
      }
      else{
       return handlerInput.responseBuilder
        .speak('What is your choice?')
        .reprompt('')
        .getResponse();
      }
      
  },
};


const pressxHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'pressx';
  },
  handle(handlerInput) {
    const speechText = 'You try and fail to press x, it would seem you are unable';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};




const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'you will be presented an option at the end of the videos. Your story is up to you.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('You will be presented an option at the end of the videos. Your story is up to you.', speechText)
      .getResponse();
  },
};


const ResumeAndPauseIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ResumeIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent');
  },
  handle(handlerInput) {

    CURR_STATE = !CURR_STATE;

    let playPause = CURR_STATE ? "play" : "pause";

      return handlerInput.responseBuilder
        .addDirective({
              type: "Alexa.Presentation.APL.ExecuteCommands",
              token: "VideoPlayerToken",
              commands: [
                {
                  type: "ControlMedia",
                  componentId: "myVideoPlayer",
                  command: playPause
                }
              ]
          })
        .getResponse();
    
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak('bye')
      .withSimpleCard('bye', speechText)
      .withShouldEndSession(true)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log("WHOLE ERROR" + JSON.stringify(error));
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again. You should have two options on screen')
      .getResponse();
  },
};

function supportsAPL(handlerInput) {
    const supportedInterfaces = handlerInput.requestEnvelope.context.System.device.supportedInterfaces;
    const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
    return aplInterface !== null && aplInterface !== undefined;
}

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    ResumeAndPauseIntentHandler,
    SessionEndedRequestHandler,
    payHandler,
    dontpayHandler,
    romanceHandler,
    horrorHandler,
    freedomHandler,
    relaxHandler,
    dontblinkHandler,
    dontmoveHandler,
    noHandler,
    yesHandler,
    rightHandler,
    leftHandler,
    attackHandler,
    dontattackHandler,
    roadHandler,
    shinyHandler,
    digHandler,
    picklockHandler,
    splitupHandler,
    staytogetherHandler,
    exitHandler,
    pbnjHandler,
    tunaHandler,
    videndhandler,
    newgameHandler,
    tryagainHandler,
    leaveHandler,
    pressxHandler,
    moreHandler
    
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();