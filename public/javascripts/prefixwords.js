$(document).ready(function() {
    $('#prefix_input input#prefix').on("input", getMatchingWords);
});


// Change this to point to a valid Trie lookup service
var SIMILAR_REST_URL = "http://ec2-52-91-226-245.compute-1.amazonaws.com/prefix/similar/";

function getMatchingWords(prefix) {
    var tableContent = "";
    var prefix = $('#prefix_input input#prefix').val();

    if (!prefix) {
        $('#matchingwords table tbody').html(tableContent);
        $('#prefix_input label#count').text('   0 words');
        return;
    }

    $.getJSON(SIMILAR_REST_URL + prefix, function(data) {

        var max_per_column = 40;
        var count = 0;

        $('#prefix_input label#count').text('   ' + data.length + ' words');

        // Master table has only 1 row
        tableContent += '<tr>';

        $.each(data, function() {
            if (count % max_per_column == 0) {
                tableContent += '<td>';
                tableContent += '<table>';
            }

            tableContent += '<tr>';
            tableContent += '<td>' + this.toString() + '</td>';
            tableContent += '</tr>';

            if ((count+1) % max_per_column == 0) {
                tableContent += '</table>';
                tableContent += '</td>';
            }
            ++count;
        });

        tableContent += '</tr>';

        $('#matchingwords table tbody').html(tableContent);
    });
};
