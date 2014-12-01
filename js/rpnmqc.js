//mqc
var rpnmqcmodule = function() {

    var datas;
    var domelem;
    var validationButton;
    var responses;

    var init = function(_datas, _domelem) {
        _.defaults(_datas, {
            questions: ["No questions!"],
            answers: ["As no answers"]
        });

        datas = _datas;
        domelem = _domelem;
        responses = [];
        buildUi();
    };

    var buildUi = function() {
        //build marker toolbar
        domelem.addClass('mqc');

        //build panel with sentences
        var uilist = $('<ul>', {
            'class': 'list-unstyled'
        });
        $.each(datas.questions, function(idq, question) {
            responses[idq] = -1; //initialize all responses to uncheck
            var li = $('<li>');
            li.append($('<p>' + question.label + '</p>'));
            var answerGroup = $('<div class="btn-group" data-toggle="buttons">');
            $.each(datas.answers, function(ida, answer) {
                answerGroup.append($('<label class="btn btn-default"><input type="radio" name="question_' + idq + '" id="answer_' + idq + '_' + ida + '" autocomplete="off">' + answer.label + '</label>').click(function() {
                    responses[idq] = ida;
                }));
                li.append(answerGroup);
            });
            uilist.append(li);
        });
        domelem.append(uilist);

        //build validation button
        validationButton = rpnsequence.genericValidateButton();
        domelem.append(validationButton);

        bindUiEvents();
    };

    var bindUiEvents = function() {
        validationButton.click(function() {
            rpnsequence.handleEndOfModule(responses, function(res, sol) {
                var score = 0;
                _.each(sol, function(val, idx) {
                    score += res[idx] == val ? 1 : 0;
                });
                return score;
            });
        });
    };

    return {
        init: init
    };

};