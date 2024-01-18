//window.onload = pageLoaded();
var windowWidth;
var imgPrev;
var imgCurr;
var imgNext;
var imgWidth;
var imgHeight;
var arrImgs;
var directory;
var count = 0;
var rArrow;
var lArrow;
var comicImgs;
var comicImgButtons;
var startx = 0;
var dist = 0;
var swiping = false;
var lastPage = false;
//var mouse = false;//detect mouse movement and change to true. detect touch and change to false. for the arrow images display.

function pageLoaded()
{
	rArrow = document.getElementById('ComicNextBtn');
	lArrow = document.getElementById('ComicPrevBtn');
	comicImgs = document.getElementById('ComicImgs');
	comicImgButtons = document.getElementById('ComicImgButtons');
	
	if(location.href.toString().indexOf('TheNidanNinja') > -1) 
	{
		directory = 'Images/TheNidanNinja/';
		arrImgs = ['Img1','Img2','Img3','Img4','Img5','Img6','Img7','Img8','Img9','Img10','Img11','Img12','Img13','Img14','Img15','Img16','Img17','Img18','Img19'];
	}
	else if(location.href.toString().indexOf('TheShodanShowdown') > -1) 
	{
		directory = 'Images/TheShodanShowdown/';
		arrImgs = ['Img1','Img2','Img3','Img4','Img5','Img6','Img7','Img8','Img9','Img10','Img11','Img12','Img13','Img14','Img15','Img16','Img17','Img18','Img19','Img20'];
	}
	else if(location.href.toString().indexOf('TheSandanSamurai') > -1) 
	{
		directory = 'Images/TheSandanSamurai/';
		arrImgs = ['Img1','Img2','Img3','Img4','Img5','Img6','Img7','Img8','Img9','Img10','Img11','Img12','Img13','Img14','Img15','Img16','Img17'];
	}
	
	imgPrev = document.getElementById('ComicImgPrev');
	imgCurr = document.getElementById('ComicImgCurr');
	imgNext = document.getElementById('ComicImgNext');
	
	imgPrev.setAttribute('src', directory + arrImgs[0] + '.jpg');
	imgCurr.setAttribute('src', directory + arrImgs[0] + '.jpg');
	imgNext.setAttribute('src', directory + arrImgs[1] + '.jpg');
	
	comicSize();
	//window.addEventListener("resize", comicSize());
	
	imgPrev.setAttribute('style', 'width:0px; height:' + imgHeight + 'px;');
	imgCurr.setAttribute('style', 'width:' + imgWidth + 'px; height:' + imgHeight + 'px;');
	imgNext.setAttribute('style', 'width:0px; height:' + imgHeight + 'px;');
	
	if(is_touch_device())
	{
		lArrow.setAttribute('style', 'display: none;');
		rArrow.setAttribute('style', 'display: none;');
	}
	else
	{
		lArrow.setAttribute('style', 'display: block;');
		rArrow.setAttribute('style', 'display: block;');
	}
	var ComicArea = document.getElementById('ComicSectionView');
	if (window.navigator.pointerEnabled)
	{		
		var myGesture = new MSGesture();
		myGesture.target = ComicArea;
		ComicBook.addEventListener("MSGestureChange", function(e) 
		{
			if(e.detail != e.MSGESTURE_FLAG_INERTIA)
			{
				if(!swiping)
				{
					dist = parseInt(e.offsetX) - startx;
					touchMoving();
				}
				else
				{
					return;
				}
			}
		});
		ComicArea.addEventListener('pointerdown', function(e){if(e.pointerType == "touch"){if(!swiping){e.target.setPointerCapture(e.pointerId); startx = parseInt(e.clientX);}else{return;}}});
		ComicArea.addEventListener('pointermove', function(e){if(e.pointerType == "touch"){if(!swiping){e.target.setPointerCapture(e.pointerId); myGesture.addPointer(e.pointerId);}else{return;}}});
		ComicArea.addEventListener('pointerup', function(e){if(e.pointerType == "touch"){if(!swiping || lastPage){swiping = true; e.target.setPointerCapture(e.pointerId); touchEnded(); lastPage = false;}else{return;}}});
		//ComicArea.addEventListener('pointerout', function(e){if (window.navigator.pointerEnabled && (e.pointerType == "mouse" && e.buttons == 1)){touchEnded();}});
	}
	else
	{
		if(isIE() != 8)
		{
			ComicArea.addEventListener('touchstart', function(e){if(!swiping){e.preventDefault(); var touchobj = e.changedTouches[0]; startx = parseInt(touchobj.clientX);}else{return;}});
			ComicArea.addEventListener('touchmove', function(e){if(!swiping){e.preventDefault(); var touchobj = e.changedTouches[0]; dist = parseInt(touchobj.clientX) - startx; touchMoving(e);} else {return;}});
			ComicArea.addEventListener('touchend', function(e){if(!swiping || lastPage){e.preventDefault(); swiping = true; touchEnded(); lastPage = false;}else{return;}});
		}
		else
		{
			lArrow.setAttribute('style', 'filter: alpha(opacity = 0);');
			rArrow.setAttribute('style', 'filter: alpha(opacity = 0);');
			/*lArrow.setAttribute('onmouseover', 'mouseOverArrow(this);');
			rArrow.setAttribute('onmouseover', 'mouseOverArrow(this);');
			lArrow.setAttribute('onmouseout', 'mouseOutArrow(this);');
			rArrow.setAttribute('onmouseout', 'mouseOutArrow(this);');*/
			lArrow.attachEvent("onmouseover", function(){mouseOverArrow(lArrow);});
			rArrow.attachEvent("onmouseover", function(){mouseOverArrow(rArrow);});
			lArrow.attachEvent("onmouseout", function(){mouseOutArrow(lArrow);});
			rArrow.attachEvent("onmouseout", function(){mouseOutArrow(rArrow);});
		}
	}
	
}

function isIE() 
{
	var myNav = navigator.userAgent.toLowerCase();
	return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

function mouseOverArrow(btn)
{
	var btnID = btn.id;
	$("#" + btnID).animate({opacity: '0.5'}, 300);
}
function mouseOutArrow(btn)
{
	var btnID = btn.id;
	$("#" + btnID).animate({opacity: '0'}, 300);
}

function comicSize()
{
	windowWidth = document.documentElement.clientWidth + 17;
		
	if(windowWidth > 1024)
	{
		imgWidth = 640;
		imgHeight = 960;
	}
	else if(windowWidth > 749 && windowWidth <= 1024)
	{
		imgWidth = 480;
		imgHeight = 720;
	}
	else if(windowWidth > 600 && windowWidth <= 749)
	{
		imgWidth = 400;
		imgHeight = 600;
	}
	else if(windowWidth > 480 && windowWidth <= 600)
	{
		imgWidth = 320;
		imgHeight = 480;
	}
	else if(windowWidth > 380 && windowWidth <= 480)
	{
		imgWidth = 290;
		imgHeight = 435;
	}
	else if( windowWidth <= 380)
	{
		imgWidth = 260;
		imgHeight = 390;
	}
	
	var ComicSection = document.getElementById('ComicSectionView');
	
	imgPrev.setAttribute('style', 'width:0px; height:' + imgHeight + 'px;');
	imgCurr.setAttribute('style', 'width:' + imgWidth + 'px; height:' + imgHeight + 'px;');
	imgNext.setAttribute('style', 'width:0px; height:' + imgHeight + 'px;');
	lArrow.height = imgHeight;
	rArrow.height = imgHeight;
	lArrow.width = imgWidth / 5;
	rArrow.width = imgWidth / 5;
	ComicSection.setAttribute('style', 'width:' + imgWidth + 'px; height:' + imgHeight + 'px;');
	
}

function is_touch_device() 
{
 return (('ontouchstart' in window)
      || (navigator.MaxTouchPoints > 0)
      || (navigator.msMaxTouchPoints > 0));
}

function touchMoving(e)
{	
	if(dist > 0)
	{
		if(count > 0)
		{
			imgNext.setAttribute('style', 'width:0px; height:' + imgHeight + 'px;');
			if(count + 1 != arrImgs.length)
			{
				var imgCurrMovingWidth = imgWidth - dist;
				var imgPrevMovingWidth = 0 + dist;
				if(imgCurrMovingWidth > 0)
				{
					imgCurr.setAttribute('style', 'width: ' + imgCurrMovingWidth +'px; height: ' + imgHeight + 'px;');
					imgPrev.setAttribute('style', 'width: ' + imgPrevMovingWidth +'px; height: ' + imgHeight + 'px;');
				}
				
			}
			else
			{
				if(comicImgs.getAttribute('style') != 'display: block;' && comicImgs.getAttribute('style') != null)
				{
					if(dist > 0 +(imgWidth / 3))
					{
						comicImgs.setAttribute('style','display: block;');
						comicImgButtons.setAttribute('style','display:none;');
						startx = startx- startx;
						swiping = true;
						lastPage = true;
					}
					
				}
				else
				{
					var imgCurrMovingWidth = imgWidth - dist;
					var imgPrevMovingWidth = 0 + dist;
					if(imgCurrMovingWidth > 0)
					{
						imgCurr.setAttribute('style', 'width: ' + imgCurrMovingWidth +'px; height: ' + imgHeight + 'px;');
						imgPrev.setAttribute('style', 'width: ' + imgPrevMovingWidth +'px; height: ' + imgHeight + 'px;');
					}
				}
			}
		}
	}
	else if(dist < 0)
	{
		imgPrev.setAttribute('style', 'width:0px; height:' + imgHeight + 'px;');
		if(count + 1 != arrImgs.length)
		{
			var imgCurrMovingWidth = imgWidth - (dist - dist - dist);
			var imgNextMovingWidth = 0 - dist;
			if(imgCurrMovingWidth > 0)
			{
				imgCurr.setAttribute('style', 'width: ' + imgCurrMovingWidth +'px; height: ' + imgHeight + 'px;');
				imgNext.setAttribute('style', 'width: ' + imgNextMovingWidth +'px; height: ' + imgHeight + 'px;');
			}
			
		}
		else
		{
			var imgCurrMovingWidth = imgWidth - (dist - dist - dist);
			if(imgCurrMovingWidth > 0)
			{
				imgCurr.setAttribute('style', 'width: ' + imgCurrMovingWidth +'px; height: ' + imgHeight + 'px;');
			}
		}
	}
	
	//e.preventDefault();
}

function touchEnded()
{
	if(dist > 0 +(imgWidth / 3))
	{
		if(count + 1 != arrImgs.length)
		{
			prevPage();
		}
		else
		{
			if(imgCurr.getAttribute('style') != 'width: ' + imgWidth + 'px; height: ' + imgHeight + 'px;')
			{
				prevPage();
			}
			else
			{
				swiping = false;
			}
		}
	}
	else if(dist < 0 - (imgWidth / 3))
	{
		nextPage();
	}
	else
	{
		if(dist > 0)
		{
			$("#ComicImgCurr").animate({width:imgWidth + "px"}, 500);
			$("#ComicImgPrev").animate({width:"0px"}, 500);
		}
		else if(dist < 0)
		{
			$("#ComicImgCurr").animate({width:imgWidth + "px"}, 500);
			$("#ComicImgNext").animate({width:"0px"}, 500);
		}
		swiping = false;
	}
	//e.preventDefault();
}

function resetComic()
{
	count = 0;
	imgPrev.setAttribute('src', directory + arrImgs[0] + '.jpg');
	imgCurr.setAttribute('src', directory + arrImgs[0] + '.jpg');
	imgNext.setAttribute('src', directory + arrImgs[1] + '.jpg'); 
	comicImgs.setAttribute('style','display:block');
	if(is_touch_device())
	{
		lArrow.setAttribute('style', 'display: none;');
		rArrow.setAttribute('style', 'display: none;');
	}
	else
	{
		lArrow.setAttribute('style', 'display: block;');
		rArrow.setAttribute('style', 'display: block;');
	}
	comicImgButtons.setAttribute('style','display:none;');
}

function nextPage()
{
	lArrow.setAttribute('onclick','');
	rArrow.setAttribute('onclick','');
	
	count++;
	if(count + 1 <= arrImgs.length)
	{
		$("#ComicImgCurr").animate({width:"0px"}, 500);
		$("#ComicImgNext").animate({width: imgWidth + "px"}, 500);
		setTimeout(function()
		{
			
				imgPrev.setAttribute('src', directory + arrImgs[count - 1] + '.jpg');
				imgCurr.setAttribute('src', directory + arrImgs[count] + '.jpg');
				if(count + 2 <= arrImgs.length)	imgNext.setAttribute('src', directory + arrImgs[count + 1] + '.jpg');
				imgPrev.setAttribute('style', 'width: 0px; height: ' + imgHeight + 'px;');
				imgCurr.setAttribute('style', 'width: ' + imgWidth + 'px; height: ' + imgHeight + 'px;');
				imgNext.setAttribute('style', 'width: 0px; height: ' + imgHeight + 'px;');
				lArrow.setAttribute('onclick','prevPage();');
				rArrow.setAttribute('onclick','nextPage();');
				swiping = false;
		},600);
		
	}
	else
	{
		count--;
		//script needed to display a button to go back to the start of the comic, display a link to the kata video and a link to the kata application
		imgPrev.setAttribute('style', 'width: 0px; height: ' + imgHeight + 'px;');
		imgCurr.setAttribute('style', 'width: ' + imgWidth + 'px; height: ' + imgHeight + 'px;');
		imgNext.setAttribute('style', 'width: 0px; height: ' + imgHeight + 'px;');
		comicImgs.setAttribute('style','display: none');
		//lArrow.setAttribute('style','display:none');
		rArrow.setAttribute('style','display: none');
		comicImgButtons.setAttribute('style','display: block;');
		lArrow.setAttribute('onclick','prevPage();');
		rArrow.setAttribute('onclick','nextPage();');
		swiping = false;
	}
	
}

function prevPage()
{
	lArrow.setAttribute('onclick','');
	rArrow.setAttribute('onclick','');
	
	count--;
	if(count - 1 >= -1)
	{
		if(count + 2 == arrImgs.length)
		{
			//if((comicImgs.getAttribute('style') != 'display: block;' && comicImgs.getAttribute('style') != null) || lastPage)
			if(comicImgs.getAttribute('style') != 'display: block;' && comicImgs.getAttribute('style') != 'DISPLAY: block' && comicImgs.getAttribute('style') != null)
			{
				comicImgs.setAttribute('style','display: block;');
				rArrow.setAttribute('style','display: block;');
				if(isIE() == 8)
				{
					rArrow.setAttribute('style', 'filter: alpha(opacity = 0);');
				}
				comicImgButtons.setAttribute('style','display: none;');
				lArrow.setAttribute('onclick','prevPage();');
				rArrow.setAttribute('onclick','nextPage();');
				count++;
				swiping = false;				
			}
			else
			{
				$("#ComicImgCurr").animate({width:"0px"}, 500);
				$("#ComicImgPrev").animate({width:imgWidth + "px"}, 500);
				setTimeout(function()
				{
					
						imgPrev.setAttribute('src', directory + arrImgs[count - 1] + '.jpg');
						imgCurr.setAttribute('src', directory + arrImgs[count] + '.jpg');
						imgNext.setAttribute('src', directory + arrImgs[count + 1] + '.jpg');
						imgPrev.setAttribute('style', 'width: 0px; height: ' + imgHeight + 'px;');
						imgCurr.setAttribute('style', 'width: ' + imgWidth + 'px; height: ' + imgHeight + 'px;');
						imgNext.setAttribute('style', 'width: 0px; height: ' + imgHeight + 'px;');
						lArrow.setAttribute('onclick','prevPage();');
						rArrow.setAttribute('onclick','nextPage();');
						swiping = false;
				},600);
			}
		}
		else
		{
			$("#ComicImgCurr").animate({width:"0px"}, 500);
			$("#ComicImgPrev").animate({width:imgWidth + "px"}, 500);
			setTimeout(function()
			{
				
					if(count - 2 >= 1) imgPrev.setAttribute('src', directory + arrImgs[count - 1] + '.jpg');
					imgCurr.setAttribute('src', directory + arrImgs[count] + '.jpg');
					imgNext.setAttribute('src', directory + arrImgs[count + 1] + '.jpg');
					imgPrev.setAttribute('style', 'width: 0px; height: ' + imgHeight + 'px;');
					imgCurr.setAttribute('style', 'width: ' + imgWidth + 'px; height: ' + imgHeight + 'px;');
					imgNext.setAttribute('style', 'width: 0px; height: ' + imgHeight + 'px;');
					lArrow.setAttribute('onclick','prevPage();');
					rArrow.setAttribute('onclick','nextPage();');
					swiping = false;
			},600);
		}
		
	}
	else
	{
		count++;
		lArrow.setAttribute('onclick','prevPage();');
		rArrow.setAttribute('onclick','nextPage();');
		swiping = false;
	}
}
