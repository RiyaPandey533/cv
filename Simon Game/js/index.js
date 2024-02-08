alert("currently availaible for Pcs, not for mobile");
var buttoncolors = ["red" , "blue" , "green" , "yellow"];

var gamepattern = []; // empty array
var user_clicked_pattern = [];//empty array

var game_started = false;//to track the game that it has staretd or not && at initial phase it is not started
var level = 0;// initial start of the game from level 0

$(document).keypress(function key_press_start_game(){//to start the game we add a key press event to whole document
    if(!game_started){//if game is not started
        $("#level-title").text("Level : " + level);//after key is press we change the heading of the game
        nextSequence();//we call the function to generate a random order for the game
        game_started = true;//after game is started we update the track

    }

});

$(".btn").click(function(){//we trigger a click event & a anonymous function
    var user_chosen_color = $(this).attr("id");//we find out which color button user click
    user_clicked_pattern.push(user_chosen_color);//we store the color of the button which user click in the array
    // console.log(user_clicked_pattern); --> to check the click function is working or not
    play_sound(user_chosen_color);//it will play the sound of the button that the user has clicked
    animation(user_chosen_color);//this will add the animation to the specific buuton which the user will clicked
    check_Answer(user_clicked_pattern.length-1);//this will give the index i.e equl to the current level of the game && index starts from 0 i.e why we reduce the length by 1.
});

function check_Answer(current_Level){ //to check the answer of the user which match with the game answer
    if (gamepattern[current_Level] === user_clicked_pattern[current_Level]) {//we are checking the index of both the array of user clicked pattern && the pattern of array generated by game 

    //   console.log("success");//if both array have same index then it is the right answer && also to check that logic is working properly or not

      if (user_clicked_pattern.length === gamepattern.length){//if both array have same length && their indexes are also equal i.e the user correctly remeber the pattern then after that we call the next sequence function to generate a new pattern for next level after 1 sec.

        setTimeout(function () {//calling the function after 1 sec
            nextSequence();
        }, 500);

      }

    } 
    
    else {//user not remeber the pattern & ans is wrong.

    play_sound("wrong");//if the user gives the wrong sequence then this audio will be play

    $("body").addClass("game-over");//first the wrong ans audio will be played then this wrong ans class will be applied to whole document.

    setTimeout(function remove_game_over_class(){//after 2 sec we will remove the game over class 
        $("body").removeClass("game-over")
    }, 300);

    $("#level-title").text("Wrong Sequence,Press Any Key to Restart & Try Again");

    restart_game();//after user give the wrong sequence we will restart the game.
        //   console.log("wrong");

    }

}

function nextSequence(){

    user_clicked_pattern = [];//after the user give the right answer of the current level then the whole array becomes empty for the next level && user need to again remeber the pattern & valus will again push to this array then after again right answer this array will become empty & so on.....

    level++;//when everytime this function is call i.e the user able to crack the random pattern generated by the game the level will also increase.

    $("#level-title").text("Level : " + level);//when level will increase then we also update the heading of the game.

    var randomNumber = Math.floor(Math.random() * 3) + 1; // generating the random number 0 to 3
    var random_chosen_color = buttoncolors[randomNumber];// selecting the colours from the array randomly
    gamepattern.push(random_chosen_color);// adding the selected random colours to another array

    var random_color_button = $("#" + random_chosen_color);//selecting the button of the random color id
    random_color_button.fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);//adding flash/animation on the random selected button

    play_sound(random_chosen_color);

}

function play_sound(name){
    
    var sound = new Audio("sounds/" + name + ".mp3");//adding the sound to the buttons
    sound.play();
}

function animation(current_color_button){

    $("#" + current_color_button).addClass("pressed");//adding animation to the button which will be clicked by the user

    setTimeout(function remove_animation_class() {
        $("#" + current_color_button).removeClass("pressed");}, 100);//this will remove the animation after 0.1 sec.
}

function restart_game(){
    
    game_started = false;//to track the game that it has staretd or not && at initial phase it is not started
    level = 0;// initial start of the game from level 0
    gamepattern = []; //after restart the game sequence will also be reset 
}






 