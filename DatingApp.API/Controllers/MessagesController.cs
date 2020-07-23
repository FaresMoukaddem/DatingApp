using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IDatingRepository _repository;
        private readonly IMapper _mapper;
        public MessagesController(IDatingRepository repository, IMapper mapper)
        {
            this._mapper = mapper;
            this._repository = repository;
        }

        [HttpGet("{id}", Name = "GetMessage")]
        public async Task<IActionResult> GetMessage(int userId, int id)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var messageFromRepo = await _repository.GetMessage(id);

            if(messageFromRepo == null)
            {
                return NotFound();
            }

            return Ok(messageFromRepo);
        }

        [HttpGet]
        public async Task<IActionResult> GetMessagesForUser(int userId, [FromQuery]MessasgeParams messasgeParams)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            messasgeParams.UserId = userId;

            var messagesFromRepo = await _repository.GetMessagesForUser(messasgeParams);

            var messages = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);

            Response.AddPagination(messagesFromRepo.currentPage, messagesFromRepo.pageSize,
            messagesFromRepo.totalCount, messagesFromRepo.totalPages);

            return Ok(messages);
        }

        [HttpGet("thread/{recipientId}")]
        public async Task<IActionResult> GetMessageThread(int userId, int recipientId)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var messagesFroRepo = await _repository.GetMessageThread(userId, recipientId);

            var messageThreadToReturn = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFroRepo);

            return Ok(messageThreadToReturn);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId, MessageForCreationDto messageForCreationDto)
        {
            var sender = await _repository.GetUser(userId);

            if(sender.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            messageForCreationDto.SenderId = userId;

            var recipient = await _repository.GetUser(messageForCreationDto.RecipientId);

            if(recipient == null)
            {
                return BadRequest("Could not find user");
            }

            var message = _mapper.Map<Message>(messageForCreationDto);

            _repository.Add(message);

            if(await _repository.SaveAll())
            {
                var messageToReturn = _mapper.Map<MessageToReturnDto>(message);
                
                // We need to return all route paramters (which are useId and message.Id)
                return CreatedAtRoute("GetMessage", new {userId, id = message.Id }, messageToReturn);
            }
            
            throw new Exception("Creating the message failed on save");
        }

    }
}