const jwtMiddleware = require("../../../config/jwtMiddleware");
const commentService = require("../../app/Comment/commentService");
const commentProvider = require("../../app/Comment/commentProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const moment = require("moment");
const regexEmail = require("regex-email");
const {emit} = require("nodemon");

// 댓글 작성
exports.createComment = async function (req, res){
  const {
    content,star
  } = await req.body;

  // 이미지
  var imageURL;
    if (req.file) {
        imageURL = req.file.location;
    } else {
        imageURL = null;
    }

  // 게시글 id
  const postid=req.params.postId;

  // 사용자 user_id 로 id 가져오기 -> 변수에 저장
  const userid=req.verifiedToken.userId
  
  // 필수 정보가 누락된 경우
  if(!content || !star){
    return res.send("필수정보 누락"); 
  }

  // 현재 날짜와 시간을 DATETIME 형식의 문자열로 생성 -> 변수에 담음
  const date = await moment().format('YYYY-MM-DD HH:mm:ss');
  
  const response = await commentService.createComment(
    content,star,imageURL,date,userid,postid
  );

  return res.send(response);
};

// 전체 댓글 출력 
exports.getCommentList  = async function (req, res){
  const postid = req.params.postId;

  if (!postid) return res.send(errResponse(baseResponse.COMMENT_POSTID_EMPTY));

  const commentListResult = await commentProvider.getCommentList(postid);
    return res.send(response(baseResponse.SUCCESS, commentListResult));
};

// 댓글 수정
exports.patchComment = async function (req, res) {

  // jwt - userId, path variable :userId
  

  const userid = req.verifiedToken.userId
  const {content,star} = await req.body;
  const postid=req.params.postId; // 게시글 id
  const commentid=req.params.commentId; // 댓글 id
  
  // 이미지
  var imageURL;
    if (req.file) {
        imageURL = req.file.location;
    } else {
        imageURL = null;
    }

   // 현재 날짜와 시간을 DATETIME 형식의 문자열로 생성 -> 변수에 담음
  const date = await moment().format('YYYY-MM-DD HH:mm:ss');

  if(!content || !star){
    return res.send("필수정보 누락"); 
  }

      const editCommentInfo = await commentService.editComment(content,star,imageURL,date,userid,postid,commentid)
      return res.send(editCommentInfo);
};