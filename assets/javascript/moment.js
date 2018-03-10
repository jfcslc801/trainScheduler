// Firebase link
var db = new Firebase("https://traintime-80625.firebaseio.com/");

// on click submit button adds trains
$("#submit-button").on('click', function () {
    //user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = moment($("#first-train-time-input").val().trim(), "HH:mm").format("");
    var frequency = $("#frequency").val().trim();

    // local new train place holder
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
    }

    // console log input New train variables
    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);

    //uploads input to firebase
    db.ref().push(newTrain);

    // clears input fields
    $('input').val("");

})

db.on('child_added', function (childSnapshot, prevChildKey) {
    // console.log(childSnapshot.val());

    // store snapShot in variables
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firstTime;
    var frequency = childSnapshot.val().frequency;


    // first train time conversion
    var firstTrainConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    // current time
    var currentTime = moment();

    // time difference
    var timeDifference = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + timeDifference);

    // time appart
    var timeRemainder = timeDifference % frequency;

    // minutes for train arrival
    var minutesLeftTrainArrival = frequency - timeRemainder;

    //next train
    var nextTrain = moment().add(minutesLeftTrainArrival, 'minutes');
    var nextTrainConverted = moment(nextTrain).format("hh:mm:ss a");

    // links train date to html table
    $('#train-schedule').append("<tr><td>" + trainName  + "</td><td>"  +  destination + "</td><td>" +"Every " + frequency  + " minutes" + "</td><td>"  +  nextTrainConverted + "</td><td>"  +  minutesLeftTrainArrival + "</td>");



})