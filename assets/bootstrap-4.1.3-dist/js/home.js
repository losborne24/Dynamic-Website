$(document).ready(function() {
        // Transition effect for navbar 
        $(window).scroll(function() {
          // checks if window is scrolled more than 500px, adds/removes solid class
          if($(this).scrollTop() > 597.5) { 
              $('.navbar').addClass('solid');
          } else {
              $('.navbar').removeClass('solid');
          }
        });
});

var scrollCount = 0;
document.getElementById('scroll-icon').addEventListener('click',function(){
  window.requestAnimationFrame(function(){
        scrollCount = window.pageYOffset;
   scrollDown() 
  });
});

function scrollDown(){
  scrollCount += 25;
  if (window.pageYOffset < document.getElementById('hero').clientHeight-70){
  window.scrollTo(0,scrollCount);
  window.requestAnimationFrame(function(){
    scrollDown();
  });
  }

};

window.onscroll = function(){
  if (window.pageYOffset > 300) {
        document.getElementById('col-left').classList.add('fade-in-left')
       window.setTimeout(function(){
          document.getElementById('col-right1').classList.add('fade-in-bottom')
       },300)
       window.setTimeout(function(){
          document.getElementById('col-right2').classList.add('fade-in-bottom')
       },300)
  }
}

//Load Content
$.fn.contentinit = function (item,defaultStr) {
  var con_html = localStorage.getItem(item);
  if(con_html == null){
    con_html = defaultStr;//'Badminton at Durham University is enjoyed by players of all standards, from social clubs in the colleges right up to competitive inter-university competitions played by the elite squad. DUBadC oversees all badminton played at the university and often gets involved with other clubs within the local community. Whatever your interest, there will be an opportunity for you to play badminton during your time at Durham.<br><br>Are you interested in playing badminton for the university?<br><br>Preseason:<br><br>Preseason is the first port of call for new players interested in joining the squad. This consists of two weeks of badminton and social activities with the current elite squad the week before Freshers week. This year preseason will run from 17th-28th September.<br><br>Trials:<br><br>Trials to join the elite squad for the 2018/19 season will be held at the Graham Sports Centre, Maiden Castle. Men\'s trials will be held on Friday 5th October 20:00-22:00 and women\'s trials on Saturday 6th October 9:00-11:00.<br><br>Questions regarding badminton at Durham University can be sent to: <br> Club President, Tom Davies: thomas.p.davies@durham.ac.uk <br> Women\'s Captain, Joshmyn Bong: joshmyn.bong@durham.ac.uk <br> Men\'s Captain, Jack Richings: jack.richings@durham.ac.uk.<br>'
  }
  $(this).empty();
  $(this).append(con_html);
  //console.log(defaultStr);
}
//$('#home_t1').contentinit("home_t1","Badminton at Durham University is enjoyed by players of all standards, from social clubs in the colleges right up to competitive inter-university competitions played by the elite squad. DUBadC oversees all badminton played at the university and often gets involved with other clubs within the local community. Whatever your interest, there will be an opportunity for you to play badminton during your time at Durham.<br><br>Are you interested in playing badminton for the university?<br><br>Preseason:<br><br>Preseason is the first port of call for new players interested in joining the squad. This consists of two weeks of badminton and social activities with the current elite squad the week before Freshers week. This year preseason will run from 17th-28th September.<br><br>Trials:<br><br>Trials to join the elite squad for the 2018/19 season will be held at the Graham Sports Centre, Maiden Castle. Men's trials will be held on Friday 5th October 20:00-22:00 and women's trials on Saturday 6th October 9:00-11:00.<br><br>Questions regarding badminton at Durham University can be sent to: <br> Club President, Tom Davies: thomas.p.davies@durham.ac.uk <br> Women's Captain, Joshmyn Bong: joshmyn.bong@durham.ac.uk <br> Men's Captain, Jack Richings: jack.richings@durham.ac.uk.<br>");
var edit = false;

function buttonClicked() {
  //console.log (window.location.pathname+ edit) ;
  if (edit){
    $("#btn-edit").text('Edit Page');
    edit = false;
    
    $("#btn-edit-home-t1").css('visibility', 'hidden');
    edit_home_t1 = false;
    $("#btn-edit-preseason-t1").css('visibility', 'hidden');
    edit_preseason_t1 = false;
    $("#btn-edit-college-t1").css('visibility', 'hidden');
    edit_college_t1 = false;
    $("#btn-edit-development-t1").css('visibility', 'hidden');
    edit_development_t1 = false;
    $("#btn-edit-other-t1").css('visibility', 'hidden');
    edit_other_t1 = false;
    $("#btn-edit-news-t1").css('visibility', 'hidden');
    edit_news_t1 = false;
    $("#btn-edit-news-t2").css('visibility', 'hidden');
    edit_news_t2 = false;
     $("#btn-edit-news-t3").css('visibility', 'hidden');
    edit_news_t3 = false;
    $("#btn-edit-news-t4").css('visibility', 'hidden');
    edit_news_t4 = false;
    $("#btn-edit-news-t5").css('visibility', 'hidden');
    edit_news_t5 = false;
    $("#btn-edit-news-t6").css('visibility', 'hidden');
    edit_news_t6 = false;

    $('textarea').each(function (index, value) { 
      var html = $(this).val();
      var viewableText = $("<p>");
      viewableText.attr('id',$(this).attr('id')); 
      console.log($(this).attr('id'));
      viewableText.html(html);
      $(this).replaceWith(viewableText);
      localStorage.setItem($(this).attr('id'), viewableText.html());//JSON.stringify(t1_text)); 
    });   
  }else{
    $("#btn-edit").text('Done');
    edit = true;

    $("#btn-edit-home-t1").css('visibility', 'visible');
    $("#btn-edit-preseason-t1").css('visibility', 'visible');
    $("#btn-edit-college-t1").css('visibility', 'visible');
    $("#btn-edit-development-t1").css('visibility', 'visible');
    $("#btn-edit-other-t1").css('visibility', 'visible');
    $("#btn-edit-news-t1").css('visibility', 'visible');
    $("#btn-edit-news-t2").css('visibility', 'visible');
    $("#btn-edit-news-t3").css('visibility', 'visible');
    $("#btn-edit-news-t4").css('visibility', 'visible');
    $("#btn-edit-news-t5").css('visibility', 'visible');
    $("#btn-edit-news-t6").css('visibility', 'visible');
  }
};
//top right button click
$(document).ready(function () {
    $("#btn-edit").click(buttonClicked);
});

var edit_home_t1 =false;
function btn_home_t1_clicked() {
    edit_home_t1 = clicked(edit_home_t1, 'home_t1');   
}
var edit_preseason_t1 =false;
function btn_preseason_t1_clicked() {
    edit_preseason_t1 = clicked(edit_preseason_t1, 'preseason_t1');   
}
var edit_college_t1 =false;
function btn_college_t1_clicked() {
    edit_college_t1 = clicked(edit_college_t1, 'college_t1');   
}
var edit_development_t1 =false;
function btn_development_t1_clicked() {
    edit_development_t1 = clicked(edit_development_t1, 'development_t1');   
}
var edit_other_t1 =false;
function btn_other_t1_clicked() {
    edit_other_t1 = clicked(edit_other_t1, 'other_t1');   
}
var edit_news_t1 =false;
function btn_news_t1_clicked() {
    edit_news_t1 = clicked(edit_news_t1, 'news_t1');   
}
var edit_news_t2 =false;
function btn_news_t2_clicked() {
    edit_news_t2 = clicked(edit_news_t2, 'news_t2');   
}
var edit_news_t3 =false;
function btn_news_t3_clicked() {
    edit_news_t3 = clicked(edit_news_t3, 'news_t2');   
}
var edit_news_t4 =false;
function btn_news_t4_clicked() {
    edit_news_t4 = clicked(edit_news_t4, 'news_t4');   
}
var edit_news_t5 =false;
function btn_news_t5_clicked() {
    edit_news_t5 = clicked(edit_news_t5, 'news_t5');   
}
var edit_news_t6 =false;
function btn_news_t6_clicked() {
    edit_news_t6 = clicked(edit_news_t6, 'news_t6');   
}


function clicked(edit, item){
if (edit){
      edit = false;
      var html = $("#" + item).val();
      var viewableText = $("<p>");
      viewableText.attr('id',item ); 
      viewableText.html(html);
      $("#" +item).replaceWith(viewableText);
      localStorage.setItem(item, viewableText.html());
    }else{
      edit = true;
      var pHtml = $("#" +item).html();
     // console.log($("#t1").html());
      var editableText = $("<textarea/>");
      editableText.attr('id', item);
      editableText.css('width','100%')
      editableText.css('height','500px')
      editableText.val(pHtml);
      $("#" +item).replaceWith(editableText);
    }
    return edit
};
