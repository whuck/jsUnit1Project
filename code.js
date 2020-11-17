//global var
var za = {
    size:"Small",
    crust:"Thin",
    subTotal:7.00
}
$(document).ready(function() {
    //when order is done, calculate and display total
    //prevent default submit behavior
    $("form").submit(function(event) {
        event.preventDefault();
        alert("Your pizza is on its way!");
    });

    //when pizza size is changed update subtotal
    $("#zaSize").change(function() {
        //grab the selected za size from dropdown
        var sizeChoice = $("#zaSize").val();

        //depending on size, update subtotal & global za object
        if(sizeChoice === "s") {
            za.subTotal = 7.00;
            za.size="Small";
        }
        else if (sizeChoice === "m") {
            za.subTotal = 9.00;
            za.size="Medium";
        }
        else if (sizeChoice === "l") {
            za.subTotal = 12.00;
            za.size="Large";
        }
        $("#zaSubtotal").val("$"+za.subTotal.toFixed(2));
    });
    //when pizza crust is changed update global object
    $("#zaCrust").change(function() {
        //grab the selected za crust from dropdown
        var crustChoice = $("#zaCrust").val();
        //depending on crust, update global za object
        if(crustChoice === "thin") za.crust="Thin";
        else if (crustChoice === "pan") za.crust="Pan";
        else if (crustChoice === "gf") za.crust="Gluten Free";
    });
    //whenever a checkbox is checked/unchecked ... update subtotal output & global za
    $("form :checkbox").change(function() {
        if(this.checked) { // if checked add to subtotal
            if(this.name==="meats") {
                za.subTotal += 1.50;
                $("#zaSubtotal").val("$" + za.subTotal.toFixed(2));
            } else {
                za.subTotal += 1.00;
                $("#zaSubtotal").val("$" + za.subTotal.toFixed(2));
            }

        } else if (this.name === "meats") { //else unchecked, subtract
            za.subTotal -= 1.50;
            $("#zaSubtotal").val("$" + za.subTotal.toFixed(2));
        } else {
            za.subTotal -= 1.00;
            $("#zaSubtotal").val("$" + za.subTotal.toFixed(2));
        }
    });
    //when the order confirmation tab is clicked, fill out the table w/ order data
    $("#step3-tab").click(function() {
        //dirty validation, if any of the delivery info is blank, shows an alert
        //and shows an error on last page, disables order btn
        if(!$("#deliveryName").val() ||
            !$("#deliveryAddress").val() ||
            !$("#deliveryPhone").val()) {
                alert("Please Fill out Delivery Info");
                $("#orderBtn").prop("disabled",true);
                $("#deliveryError").show();
        } else { // form's filled out, hide the error, enable order btn
            $("#deliveryError").hide();
            $("#orderBtn").prop("disabled",false);
        }
        $("#sum-size").text(za.size);
        $("#sum-crust").text(za.crust);
        var meats = "";
        var veggies = "";
        //grab checked checkboxes, and add to output strings
        $("input:checked").each(function() {
            if(this.name==="meats") {
                //if this is not the first meat, add a comma
                if(meats!=="") meats += ", ";
                meats += this.value;
            }
            else if(this.name==="veggies") {
                //if this is not the first veggies, add a comma
                if(veggies!=="") veggies += ", ";
                veggies += this.value;
            }
        });
        $("#sum-meats").text(meats);
        $("#sum-veggies").text(veggies);

        $("#conf-subtotal").text("$"+za.subTotal.toFixed(2));
        //calc tax
        var tax = za.subTotal * .051;
        $("#conf-tax").text("$"+tax.toFixed(2));
        //display delivery fee
        var deliveryFee = 2.00;
        $("#conf-delivery").text("$"+deliveryFee.toFixed(2));
        //calc + display total
        var total = tax + deliveryFee + za.subTotal;
        $("#conf-total").text("$"+total.toFixed(2));
    });
    function calcBMI() {

        var w = parseFloat($("#weight").val());
        var h = parseFloat($("#height").val());
        var BMI = (w / (h * h)) * 703;
        var BMI = BMI.toFixed(1);
        var cat = "";
        if(BMI < 15) {cat = "Very severely underweight";}
        else if (BMI < 16) {cat = "Severely underweight";}
        else if (BMI < 18.5)  {cat = "Underweight";}
        else if (BMI < 25) {cat = "Normal";}
        else if (BMI < 30) {cat = "Overweight";}
        else if (BMI < 35) {cat = "Moderately obese";}
        else if (BMI < 40) {cat = "Severely obese";}
        else {cat = "Very severely obese";}
        var output = BMI + " or " + cat;
        $("#output").val(output);

    }
});