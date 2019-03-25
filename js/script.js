(function() {
	"use strict";
	
	$('#double-slider').slider({
		min: 0,
		max: 3650,
		orientation: "horizontal",
		animate: true,
		range: true,
		step: 1,
		values: [0, 3000],
		slide: function(event, ui) {
			$('#price-min').val(ui.values[0]);
			$('#price-max').val(ui.values[1]);
		}
	});

	$('#price-min').bind('input', function() {
		var min = $('#price-min').val();
		var max = $('#price-max').val();
		$('#double-slider').slider( "option", "values", [min, max] );
	});
	
	$('#price-max').bind('input', function() {
		var min = $('#price-min').val();
		var max = $('#price-max').val();
		$('#double-slider').slider( "option", "values", [min, max] );
	});
	
	$('a[href^="#map-of-sedona"]').bind('click',function () {
		var target = this.hash;
		var $target = $(target);
		var $body = $('html, body');
		$body.stop().animate({
			'scrollTop': $target.offset().top
		}, 900, 'swing', function () {
			window.location.hash = target;
		});
	});
	
	$('#hamb').bind('click', function (event) {
		event.preventDefault();
		$('#main-nav').toggleClass('show');
	});
	
	$('#cross').bind('click', function (event) {
		event.preventDefault();
		if ($('#main-nav').hasClass('show')) {
			$('#main-nav').removeClass('show');
		}
	});
	
	$('#nav-list li a').bind('click', function () {
		if ($('#main-nav').hasClass('show')) {
			$('#main-nav').removeClass('show');
		}
	});
	
	if ($('#map-of-sedona')) {
		var init = function initMap() {
			var myLatlng = new google.maps.LatLng(34.8543784,-111.7951384);
			var myOptions = {
				zoom: 11,
				center: myLatlng
			};
			new google.maps.Map(document.getElementById('map-of-sedona'), myOptions);
		};
		$(window).bind('load', init);
		$(window).bind('resize', init);
	}
	
	$('#search-hotels').slideUp(0);
	$('#btn-search').bind('click', function (event) {
		event.preventDefault();
		$('#search-hotels').slideToggle(200);
	});
	
	function ButtonsCounter(btnPlus, btnMinus, output) {
		
		btnMinus.bind('click', function(event) {
			event.preventDefault();
			var value = parseInt(output.val(), 10);
			if (isNaN(value) || value <= 0) {
				value = 0;
			}
			else {
				value--;
			}
			output.val(value);
		});
		
		btnPlus.bind('click', function(event) {
			event.preventDefault();
			var value = parseInt(output.val(), 10);
			if (isNaN(value) || value < 0) {
				value = 0;
			}
			else {
				value++;
			}
			output.val(value);
		});
	}

	ButtonsCounter($('#adult-plus'), $('#adult-minus'), $('#adult'));
	ButtonsCounter($('#kids-plus'), $('#kids-minus'), $('#kids'));
	
	$.datepicker.regional.ru = {
		monthNames: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
		dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		firstDay: 1,
	};
	
	$.datepicker.setDefaults($.datepicker.regional.ru);
	$('#date-lab').datepicker({
		minDate: 0,
		maxDate: '+1y',
		dateFormat: 'dd MM yy'
		
	});
	
	$('#date-exit').datepicker({
		minDate: 0,
		maxDate: '+1y',
		dateFormat: 'dd MM yy'
	});
	
	var showExit = false;
	var showLab = false;
	
	$('#exit-calendar').bind('click', function(event) {
		event.preventDefault();
		if (!showExit) {
			
			$('#date-exit').datepicker('show');
			showExit = true;
		}
		else {
			
			$('#date-exit').datepicker('hide');
			showExit = false;
		}
	});
	
	$('#lab-calendar').bind('click', function(event) {
		event.preventDefault();
		if (!showLab) {
			
			$('#date-lab').datepicker('show');
			showLab = true;
		}
		else {
			
			$('#date-lab').datepicker('hide');
			showLab = false;
		}
	});
	
	function validNumberInput(num, nonZero) {
		var value = parseInt(num, 10);
		if (isNaN(value) || value < 0) {
			return false;
		}
		else if (nonZero === true && value === 0) {
			return false;
		}
		else {
			return true;
		}
	}
	
	function validDate(CheckingDate) {
		var labValue = CheckingDate.split(' ');
		
		if (labValue.length === 3) {
			var year = parseInt(labValue[2], 10);
			var month = labValue[1].toUpperCase();
			var day = parseInt(labValue[0], 10);
			var areMonth = false;
			var monthes = ['ЯНВАРЯ', 'ФЕВРАЛЯ', 'МАРТА', 'АПРЕЛЯ', 'МАЯ', 'ИЮНЯ', 'ИЮЛЯ', 'АВГУСТА', 'СЕНТЯБРЯ', 'ОКТЯБРЯ', 'НОЯБРЯ', 'ДЕКАБРЯ'];
			var monthNum;
			
			for (var i = 0; i < monthes.length; i++) {
				if (month === monthes[i]) {
					areMonth = true;
					monthNum = i + 1;
				}
			}
			
			if (isNaN(year) || year <= 2000 || year >= 2100) {
				return false;
			}
			
			else if (!areMonth){
				return false;
			}
			
			else {
				var monthDays = 30;
				var dayMax = [1, 3, 5, 7, 8, 10, 12];
				
				if (monthNum === 2) {
					if (year % 4 === 0) {
						monthDays = 29;
					}
					else {
						monthDays = 28;
					}
				}
				
				else {
					for (var k = 0; k < dayMax.length; k++) {
						if (monthNum === dayMax[k]) {
							monthDays = 31;
						}
					}
				}
				
				if (isNaN(day)) {
					return false;
				}
				
				else if (!isNaN(day) && day <= 0) {
					return false;
				}
				
				else if (day > monthDays) {
					return false;
				}
				
				else {
					return true;
				}
			}
		}
		
		else {
			return false;
		}
	}
	
	function validPeriod(beginDate,endDate) {
		var date = new Date();
		var timeZone = -1*(date.getTimezoneOffset()/60);
		var nowDate = new Date(date.setHours(timeZone, 0, 0, 0));
		var nowDateUnix = nowDate.getTime();
		var plusYearUnix = nowDate.setFullYear(nowDate.getFullYear() + 1);
		
		function monthTranslate(ruDate) {
			var ruDateArrey = ruDate.split(' ');
			var month = ruDateArrey[1].toUpperCase();
			var lib = [['ЯНВАРЯ', 'January'], ['ФЕВРАЛЯ', 'February'], ['МАРТА', 'March'], ['АПРЕЛЯ', 'April'], ['МАЯ', 'May'], ['ИЮНЯ', 'June'], ['ИЮЛЯ', 'July'], ['АВГУСТА', 'August'], ['СЕНТЯБРЯ', 'September'], ['ОКТЯБРЯ', 'October'], ['НОЯБРЯ', 'November'], ['ДЕКАБРЯ', 'December']];
			for (var a = 0; a < lib.length; a++) {
				if (month === lib[a][0]) {
					month = lib[a][1];
				}
			}
			ruDateArrey.splice(1, 1, month);
			var engDateArrey = ruDateArrey;
			return engDateArrey;
		}
		
		function arreyToDate(arr) {
			var time = new Date(arr);
			var date = new Date(time.setHours(timeZone, 0, 0, 0));
			return date;
		}
		
		var beginDateUnix = arreyToDate(monthTranslate(beginDate));
		beginDateUnix = beginDateUnix.getTime();
		var endDateUnix = arreyToDate(monthTranslate(endDate));
		endDateUnix = endDateUnix.getTime();
		var validate = 0;
		
		if ((beginDateUnix >= nowDateUnix) && (beginDateUnix <= plusYearUnix)) {
			validate++;
			$('#date-lab').removeAttr('style');
		}
		else {
			$('#date-lab').css('outline', '1px solid red');
		}
		
		if ((endDateUnix >= nowDateUnix) && (endDateUnix >= beginDateUnix) && (endDateUnix <= plusYearUnix)) {
			$('#date-exit').removeAttr('style');
			validate++;
		}
		else {
			$('#date-exit').css('outline', '1px solid red');
		}
		
		if (validate === 2) {
			return true;
		}
		else {
			return false;
		}
	}

	function requiredValue() {
		var adult = $('#adult').val();
		var labDate = $('#date-lab').val();
		var exitDate = $('#date-exit').val();
		if (adult && labDate && exitDate) {
			$('#adult').removeAttr('style');
			$('#date-lab').removeAttr('style');
			$('#date-exit').removeAttr('style');
			return true;
		}
		else {
			if(!adult) {
				$('#adult').css('outline', '1px solid red');
			}
			else {
				$('#adult').removeAttr('style');
			}
			if(!labDate) {
				$('#date-lab').css('outline', '1px solid red');
			}
			else {
				$('#date-lab').removeAttr('style');
			}
			if (!exitDate) {
				$('#date-exit').css('outline', '1px solid red');
			}
			else {
				$('#date-exit').removeAttr('style');
			}
			return false;
		}
	}

	var adultStorage = localStorage.getItem('adult');
	var kidsStorage = localStorage.getItem('kids');
	var labDateStorage = localStorage.getItem('labDate');
	var exitDateStorage = localStorage.getItem('exitDate');
	if(adultStorage) {
		$('#adult').val(adultStorage);
	}
	if(kidsStorage) {
		$('#kids').val(kidsStorage);
	}
	if(labDateStorage) {
		$('#date-lab').val(labDateStorage);
	}
	if(exitDateStorage) {
		$('#date-exit').val(exitDateStorage);
	}
	 
	$('#btn-find').bind('click', function (event) {
		event.preventDefault();
		var adult = $('#adult').val();
		var kids = $('#kids').val();
		var labDate = $('#date-lab').val();
		var exitDate = $('#date-exit').val();
		
		if(!Modernizr.input.required) { 
			if(!requiredValue()) {
				return;
			}
		}

		var labCheck = validDate(labDate);
		var exitCheck = validDate(exitDate);
		var adultCheck = validNumberInput(adult, true);
		var kidsCheck = validNumberInput(kids, false);
		var pediodCheck = false;
		
		if (labCheck && exitCheck) {
			pediodCheck = validPeriod(labDate,exitDate);
		}
		
		if (labCheck && exitCheck && adultCheck && kidsCheck && pediodCheck) {
			localStorage.setItem('adult', adult);
			localStorage.setItem('kids', kids);
			localStorage.setItem('labDate', labDate);
			localStorage.setItem('exitDate', exitDate);
			window.location.href='hotels.html';
		}
		
		else {
			if(!adultCheck) {
				$('#adult').css('outline', '1px solid red');
			}
			else {
				$('#adult').removeAttr('style');
			}
			if(!kidsCheck) {
				$('#kids').css('outline', '1px solid red');
			}
			else {
				$('#kids').removeAttr('style');
			}
			if(!labCheck) {
				$('#date-lab').css('outline', '1px solid red');
			}
			else {
				$('#date-lab').removeAttr('style');
			}
			if(!exitCheck) {
				$('#date-exit').css('outline', '1px solid red');
			}
			else {
				$('#date-exit').removeAttr('style');
			}
			if (!pediodCheck) {
				pediodCheck = validPeriod(labDate,exitDate);
			}
			return;
		}
	});
	
	var a = navigator.userAgent;
	if(a.indexOf('MSIE 10.0') !== -1 || a.indexOf('Trident/7.0') !== -1) {
		$('head').append('<link rel="stylesheet" href="css/ie10.min.css">');
	}
})();