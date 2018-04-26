$(document).ready(function(){
    
  var genderVar = $("select#filter-gender").val();
  var sizeVar = $("select#filter-size").val();
  var breedVar = $("select#filter-breed").val();

  
  // Gender filter
  $("select#filter-gender").on('change', function(){
    genderVar = $("select#filter-gender").val();
    if (genderVar !== 'Ambos'){
     $(".card[data-gender!="+genderVar+"]").hide();
      $(".card[data-gender="+genderVar+"]").show();
    }
    else{
       $(".card[data-gender='Macho']").show();
       $(".card[data-gender='Hembra']").show();
    }
  });
  
  // Size filter
  $("select#filter-size").on('change', function(){
    sizeVar = $("select#filter-size").val();
    if (sizeVar !== 'Todos'){
     $(".card[data-size!="+sizeVar+"]").hide();
      $(".card[data-size="+sizeVar+"]").show();
    }
    else{
       $(".card[data-size!='']").show();
    }
  });
    // Breed filter
    $("select#filter-breed").on('change', function(){
    breedVar = $("select#filter-breed").val();
    if (breedVar !== 'Todas'){
      $(".card[data-breed!="+breedVar+"]").hide();
      $(".card[data-breed="+breedVar+"]").show();
    }
    else{
       $(".card[data-breed!='']").show();
    }
    
   
  
  });
    
})
