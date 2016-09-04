
      (function(){
        olark.extend('WelcomeAssist');
olark.extend('Sounds');
olark.extend('GoogleAnalytics');
olark.extend('Cobrowsing');
olark.extend('CalloutBubble');


        var isNewVersion = olark._ && olark._.versions && (olark._.versions.follow || olark._.versions.popout)
        if(isNewVersion) {
          olark._.finish({"WelcomeAssist":{"notify_operator_of_new_visitors":false,"welcome_new_visitors":true,"enabled":true,"welcome_messages":["Thanks for stopping by! Can I help you with anything?"],"welcome_delay_in_seconds":60},"system":{"require_phone":0,"hashchange_events_trigger_page_change":0,"show_popout":1,"allow_change_colors":true,"operator_has_stopped_typing_text":"has stopped typing","disable_default_visitor_information":0,"email_body_error_text":"You must complete all fields and specify a valid email address","show_pre_chat":1,"hide_not_available":0,"offline_message":"Hi I am sorry we are away at the moment if you would like to leave a message we will get back to you as quick as a flash.","require_offline_phone":0,"allow_change_width":true,"allow_change_height":true,"feedback_survey_language":"en","rules":[{"actions":[{"kind":"Action","method":"api.chat.sendMessageToVisitor","options":{"body":"Hi, can I help you today?"}}],"kind":"Rule","whenOffline":false,"perPage":false,"clause":{"kind":"AndClause","clauses":[{"left":{"kind":"VariableClause","varname":"visitor.currentPage.url"},"kind":"EqualsClause","right":"https://www.design55online.co.uk/onestepcheckout/"},{"left":{"kind":"VariableClause","varname":"visitor.secondsSpentOnCurrentPage"},"kind":"GreaterThanClause","right":60}]},"whenOnline":true,"id":"1374076746996048169053229503334","enabled":true,"perVisit":true,"perVisitor":false,"description":"Long time at the checkout"},{"actions":[{"kind":"Action","method":"api.box.expand","options":{}}],"kind":"Rule","whenOffline":false,"perPage":false,"clause":{"kind":"OrClause","clauses":[{"left":{"kind":"VariableClause","varname":"visitor.currentPage.url"},"kind":"EqualsClause","right":""}]},"whenOnline":true,"id":"137407654137705862647355534136","enabled":false,"perVisit":true,"perVisitor":false,"description":""},{"actions":[{"kind":"Action","method":"api.chat.updateVisitorStatus","options":{"snippet":"(V.I.P)"}}],"kind":"Rule","whenOffline":false,"perPage":false,"clause":{"kind":"OrClause","clauses":[{"left":{"kind":"VariableClause","varname":"visitor.visitCount"},"kind":"EqualsClause","right":4}]},"whenOnline":true,"id":"137407536769307621201323345304","enabled":true,"perVisit":true,"perVisitor":false,"description":"Number of visits 4 (V.I.P)"},{"actions":[{"kind":"Action","method":"api.chat.sendMessageToVisitor","options":{"body":"Hi how you doing? How can I make your life a little bit easier today?"}}],"kind":"Rule","whenOffline":false,"perPage":false,"clause":{"kind":"OrClause","clauses":[{"left":{"kind":"VariableClause","varname":"visitor.secondsSpentOnCurrentPage"},"kind":"GreaterThanClause","right":70}]},"whenOnline":true,"id":"1374074968306039732286566868424","enabled":true,"perVisit":true,"perVisitor":false,"description":"70 Seconds on Current Page"},{"actions":[{"kind":"Action","method":"api.chat.sendMessageToVisitor","options":{"body":"Hi hows it going? If you need any help with anything at all drop me a line? "}}],"kind":"Rule","whenOffline":false,"perPage":false,"clause":{"kind":"OrClause","clauses":[{"left":{"kind":"VariableClause","varname":"visitor.pageCountForThisVisit"},"kind":"GreaterThanClause","right":7}]},"whenOnline":true,"id":"1374074164973022339647775515914","enabled":true,"perVisit":true,"perVisitor":false,"description":"10 Pages"},{"actions":[{"kind":"Action","method":"api.chat.sendMessageToVisitor","options":{"body":"Hi how are you? How can we help you live the dream today?"}}],"kind":"Rule","whenOffline":false,"perPage":false,"clause":{"kind":"OrClause","clauses":[{"left":{"kind":"VariableClause","varname":"visitor.visitCount"},"kind":"EqualsClause","right":3}]},"whenOnline":true,"id":"137407387317602303726200480014","enabled":true,"perVisit":true,"perVisitor":false,"description":"Third Visit"},{"actions":[{"kind":"Action","method":"api.chat.sendMessageToVisitor","options":{"body":"Hi, we're here to answer any questions"}}],"kind":"Rule","whenOffline":false,"perPage":false,"clause":{"kind":"OrClause","clauses":[{"left":{"kind":"VariableClause","varname":"visitor.pageCountForThisVisit"},"kind":"EqualsClause","right":6}]},"whenOnline":true,"id":2316,"enabled":true,"perVisit":true,"perVisitor":false,"description":"Start a chat after a customer has viewed 6 pages, so I can engage without being too intrusive"},{"actions":[{"kind":"Action","method":"api.chat.updateVisitorNickname","options":{"snippet":"Returning Visitor"}}],"kind":"Rule","whenOffline":false,"perPage":false,"clause":{"kind":"AndClause","clauses":[{"left":{"kind":"VariableClause","varname":"visitor.visitCount"},"kind":"GreaterThanClause","right":1}]},"whenOnline":true,"id":2317,"enabled":false,"perVisit":true,"perVisitor":false,"description":"Highlight returning visitors in my buddy list"},{"actions":[{"kind":"Action","method":"api.box.hide","options":{}}],"kind":"Rule","whenOffline":false,"perPage":false,"clause":{"kind":"AndClause","clauses":[{"left":{"kind":"VariableClause","varname":"visitor.countryCode"},"kind":"EqualsClause","right":"ZW"}]},"whenOnline":true,"id":2318,"enabled":false,"perVisit":true,"perVisitor":false,"description":"Hide chat for visitors from Zimbabwe since we cannot ship to them."},{"actions":[{"kind":"Action","method":"api.chat.sendMessageToVisitor","options":{"body":"Bonjour, Comment allez-vous?"}}],"kind":"Rule","whenOffline":false,"perPage":false,"clause":{"kind":"AndClause","clauses":[{"left":{"kind":"VariableClause","varname":"visitor.countryCode"},"kind":"EqualsClause","right":"FR"}]},"whenOnline":true,"id":"13740537648040","enabled":false,"perVisit":true,"perVisitor":false,"description":"Target my French visitors by sending a custom message in their language"}],"say_text":"Type here and hit \u003Center\u003E to chat","habla_name_input_text":"\u003Cclick here\u003E and type your Name","allow_mobile_boot":0,"habla_offline_sent_text":"Thanks for your message!  We'll get back to you shortly.","habla_offline_email_text":"\u003Cclick here\u003E and type your Email","pre_chat_error_text":"Please enter your name and email in case we get disconnected.","require_email":2,"start_expanded":0,"allowed_domains":"","inline_css_url":"static.olark.com/css/8/7/87c3e0ff930c7d33fa7ec9adab74d88c.css","bottom_margin":0,"right_margin":20,"disable_extra_br":true,"close_hides_window":1,"welcome_msg":"Questions? We'd love to chat!","not_available_text":"Contact us!","expandOnFirstMessageReceived":1,"expandOnMessageReceived":1,"habla_offline_body_text":"We're not around but we still want to hear from you!  Leave us a note:","popout_css_url":"static.olark.com/css/5/6/5628634d33473c725fb95faad8c68375.css","top_margin":0,"disable_width":true,"disable_offline_messaging_fallback":true,"height":150,"ended_chat_message":"This chat has ended, start typing below if you need anything else!","habla_offline_phone_text":"\u003Cclick here\u003E and type your Phone","pre_chat_submit":"Click here to start chatting","require_name":2,"start_hidden":false,"inline_css_url_quirks":"static.olark.com/css/6/b/6b595ca562a9d2483f71eafdbf334737.css","inline_css_url_ie":"static.olark.com/css/c/e/cec5a0c2960cd67f266221c5e902c49b.css","offline_msg_mode":1,"in_chat_text":"Live Help \u0026 Chat","pre_chat_message":"Hi, I am around, click 'start chatting' to contact me.","before_chat_text":"For Friendly Advice","operator_is_typing_text":"is typing...","habla_offline_submit_value":"Send","width":250,"right_to_left":false,"corner_position":"BR","disableJSStyles":false,"left_margin":20,"forced_rpc_server":"nrpc.olark.com/nrpc","show_in_buddy_list":"all","hkey":"PHNwYW4gc3R5bGU9ImRpc3BsYXk6bm9uZSI+PGEgaWQ9ImhibGluazkiPjwvYT5odHRwOi8vd3d3Lm9sYXJrLmNvbTwvc3Bhbj5HZXQgPGEgaHJlZj0iaHR0cDovL3d3dy5vbGFyay5jb20vP3JpZD01NTEzLTc3Mi0xMC0zNzcyJmFtcDtzYWxlcz0xJmFtcDt1dG1fbWVkaXVtPXdpZGdldCZhbXA7dXRtX2NhbXBhaWduPWZyZWVfc2FsZXMmYW1wO3V0bV9zb3VyY2U9NTUxMy03NzItMTAtMzc3MiIgaWQ9ImhibGluazk5IiAgdGFyZ2V0PSJfYmxhbmsiPkZyZWUgT2xhcmsgU2FsZXMgQ2hhdDwvYT4h","md5":"cd73425ec5a11c810aa0bb392fa7a8ea","site_id":"5513-772-10-3772","template":"azul","operators":{"602633":{"avatar_url":"//static.olark.com/imageservice/f5cc30479bc03051200de71b6b741964.png"}}},"Sounds":{"enabled":true},"GoogleAnalytics":{"create_custom_tracker":false,"enabled":true,"enable_custom_variables":true,"had_conversation_page_slot_number":5,"load_ga_if_missing":false,"had_conversation_session_slot_number":4,"had_conversation_visitor_slot_number":3,"allow_linker":false,"track_chat_start_page":true},"locale":{"feedback_survey_question_additional_feedback_text":"Additional Feedback.","feedback_survey_question_operator_speed_text":"How responsive was the chat agent?","feedback_survey_question_operator_speed_high":"Extremely responsive","feedback_survey_submission_error_message":"There was an error submitting your answer, please try again.","feedback_survey_button_finish":"Finish","feedback_survey_button_next":"Next","feedback_survey_question_operator_intelligence_high":"Extremely knowledgeable","feedback_survey_question_operator_intelligence_text":"How knowledgeable was the chat agent?","feedback_survey_button_submitting":"Submitting","feedback_survey_question_operator_attitude_high":"Extremely friendly","feedback_survey_question_operator_speed_low":"Not at all responsive","feedback_survey_question_operator_attitude_low":"Not at all friendly","feedback_survey_question_operator_intelligence_low":"Not at all knowledgeable","feedback_survey_end_message":"Thank you for your feedback :)","feedback_survey_question_chat_high":"Extremely satisfied","feedback_survey_question_1_text":"Question 1 of 5","feedback_survey_question_chat_low":"Not at all satisfied","feedback_survey_question_4_text":"Question 4 of 5","feedback_survey_question_3_text":"Question 3 of 5","feedback_survey_question_5_text":"Question 5 of 5","feedback_survey_question_2_text":"Question 2 of 5","feedback_survey_question_chat_text":"How satisfied were you with this chat?","feedback_survey_question_operator_attitude_text":"How friendly was the chat agent?"},"Cobrowsing":{"enabled":true},"CalloutBubble":{"bubble_image_url":"","enabled":true,"slide":true},"invalidate_cache":{}});
        }else{
          olark.configure(function(conf){
            conf.system.site_id="5513-772-10-3772";
          });
          olark._.finish();
        }
      })();
    