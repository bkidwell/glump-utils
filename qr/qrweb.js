// qrweb

qrcode = new QRCode(document.getElementById('result'));

$('#go').click(function() {
    var data = $('#data').val();
    var match = null;

    if($('input[name=mode]:checked').val() == 'phone') {
        var meeting = null;
        var phone = null;
        data = ' ' + data + ' ';
        match = data.match(/[^\d\-]\+?(1[\- \(\)]*)?(\d\d\d[\- \(\)]*\d\d\d[\- \(\)]*\d\d\d\d)[^\d\-]/);
        if(match && match[2]) {
            console.log('phone match: ' + match[1]);
            phone = match[2].replace(/[ \-\(\)]+/g, '');
            phone = '+1-' + phone.substr(0, 3) + '-' + phone.substr(3, 3) + '-' + phone.substr(6, 4);
            console.log('phone: ' + phone);
        }

        if(phone) {
            data = 'tel:' + phone
        } else {
            data = '(error)';
        }
    }

    if($('input[name=mode]:checked').val() == 'gtm') {
        var meeting = null;
        var phone = null;
        data = ' ' + data + ' ';
        match = data.match(/[^\d\-](\d\d\d-?\d\d\d-?\d\d\d)[^\d\-]/);
        if(match && match[1]) {
            console.log('meeting match: ' + match[1]);
            meeting = match[1].replace('-', '');
            console.log('meeting: ' + meeting);
        }
        match = data.match(/[^\d\-]\+?(1[\- \(\)]*)?(\d\d\d[\- \(\)]*\d\d\d[\- \(\)]*\d\d\d\d)[^\d\-]/);
        if(match && match[2]) {
            console.log('phone match: ' + match[1]);
            phone = match[2].replace(/[ \-\(\)]+/g, '');
            phone = '+1-' + phone.substr(0, 3) + '-' + phone.substr(3, 3) + '-' + phone.substr(6, 4);
            console.log('phone: ' + phone);
        }

        if(meeting && phone) {
            data = 'tel:' + phone + ';' + meeting;
        } else {
            data = '(error)';
        }
    }

    $('#result-text').text(data);
    qrcode.clear();
    qrcode.makeCode(data);
});

$('#clear').click(function() {
    $('#data').val('');
})
