var myBirthDateTime = new Date(2000, 1, 1, 1, 1);

function updateParagrah() {
    var now = new Date();
    var seconds = (now.getTime() - myBirthDateTime.getTime()) / 1000;

    document.getElementById('birth-time').innerText = '生まれてから' + seconds + '秒経過';
};

setInterval(updateParagrah, 50);

function areaOfCircle(r) {
    return r ** 2 * 3.14;
}

document.write('<p>半径 5cm の円の面積は ' + areaOfCircle(5) + ' です</p>');
document.write('<p>半径 10cm の円の面積は ' + areaOfCircle(10) + ' です</p>');